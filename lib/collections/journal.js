Journal = new Mongo.Collection("journal");

Journal.deny({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});

validateMessage = function(message) {
    if (!Match.test(message.sender, NonEmptyString)) {
        throw new Meteor.Error('invalid-journal', 'Sender ist nicht richtig', message);
    }
    if (!Match.test(message.receiver, NonEmptyString)) {
        throw new Meteor.Error('invalid-journal', 'Empfänger ist nicht richtig', message);
    }
    if (!Match.test(message.text, NonEmptyString)) {
        throw new Meteor.Error('invalid-journal', 'Nachricht ist leer', message);
    }
    // check that the createdAt time is before the current time plus 300seconds slack
    let now = moment().add(300,'seconds');
    if (moment(message.createdAt).isAfter(now)) {
        throw new Meteor.Error('invalid-journal', 'Zeit ist zu viel in der Zukunft (max 5min)', message);
    }
}

Meteor.methods({
    addJournalMessage: function(message,incident) {

        validateMessage(message);
        if (Meteor.isServer) {
            if (!Incidents.findOne(incident)) {
                logger.error("adding Journal Message for incident failed", incident, message);
                throw new Meteor.Error('invalid-journal', 'Ereignis schein falsch zu sein', message);
            }
        }
        Journal.insert({
            createdAt: message.createdAt ? message.createdAt : new Date(),
            insertedAt: new Date(),
            text: message.text,
            sender: message.sender,
            receiver: message.receiver,
            incident: incident,
            priority: message.priority ? message.priority : false,
        });

        return true;
    },

    updateJournalMessage: function(message) {
        validateMessage(message);
        if (Meteor.isServer) {
            logger.info("updating Journal Message", message._id);
        }
        let msg = Journal.findOne(message._id);
        if (!msg) {
            throw new Meteor.Error('invalid-journal-message', 'Nachricht existiert nicht', message._id);
        }

        let difference = moment().diff(moment(msg.insertedAt),'seconds');
        if (!msg.insertedAt || difference > 60) {
            throw new Meteor.Error('update-outdated-journal-message', 'Nachricht kann nicht mehr editiert werden (nur möglich während 60 Sekunden).', message._id);
        } else {
            Journal.update(message._id, {
                $set: {
                    createdAt: message.createdAt,
                    text: message.text,
                    sender: message.sender,
                    receiver: message.receiver,
                }
            });
        }
    },
    deleteJournalMessage: function(id) {

        let msg = Journal.findOne(id);
        if (!msg) {
            throw new Meteor.Error('delete-outdated-journal-message', 'Nachricht existiert nicht', id);
        }
        let difference = moment().diff(moment(msg.insertedAt),'seconds');
        if (!msg.insertedAt || difference > 60) {
            throw new Meteor.Error('invalid-journal-message', 'Nachricht kann nicht gelöscht werden (nur möglich während 60 Sekunden).', msg._id);
        } else {

            if (Meteor.isServer) {
                logger.info("deleting Journal Message", id);
            }

            Journal.remove(id);
            return true;
        }
    },
    toggleJournalMessagePriority: function(id) {
        let message = Journal.findOne(id);
        if (!message) {
            throw new Meteor.Error('invalid-journal-message', 'Nachricht existiert nicht', id);

        } else {

            if (Meteor.isServer) {
                logger.debug("setting priority on message ", id, !message.priority);
            }
            Journal.update(message._id, {
                $set: {
                    priority: !message.priority,
                }
            });

        }
    }
});
