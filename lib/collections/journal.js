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

}

Meteor.methods({
    addJournalMessage: function(message,incident) {

        validateMessage(message);
        if (Meteor.isServer) {
            if (!Incidents.findOne(incident)) {
                logger.error("adding Journal Message for incident failed", incident, message);
                throw new Meteor.Error('invalid-journal', 'Ereignis schein falsch zu sein', message);
            }
            logger.debug("adding Journal Message", message);
        }
        Journal.insert({
            createdAt: new Date(),
            text: message.text,
            sender: message.sender,
            receiver: message.receiver,
            incident: incident,
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
});
