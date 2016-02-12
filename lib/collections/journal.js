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
            insertdAt: new Date(),
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

        if (!Journal.findOne(message._id)) {
            throw new Meteor.Error('invalid-journal-message', 'Nachricht existiert nicht', message._id);

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

        if (!Journal.findOne(id)) {
            throw new Meteor.Error('invalid-journal-message', 'Nachricht existiert nicht', id);

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
                logger.debug("setting priority on message", id);
            }
            Journal.update(message._id, {
                $set: {
                    priority: !message.priority,
                }
            });
        }
    }
});
