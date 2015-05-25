Journal = new Mongo.Collection("journal");

Meteor.methods({
    addJournalMessage: function(message) {

        if (!Incidents.findOne(message.incident)) {
            throw new Meteor.Error('invalid-journal', 'Message belongs to unexisting incident:', message.incident);
        } else {
            console.log("adding Journal Message");

            Journal.insert({
                createdAt: new Date(),
                text: message.text,
                sender: message.sender,
                receiver: message.receiver,
                incident: message.incident,
            });
        }

        return true;
    },

    updateJournalMessage: function(message) {
        console.log("updating Journal Message", message._id);
        if (!Journal.findOne(messageID)) {
            throw new Meteor.Error('invalid-journal-message', 'message does not exist', messageID);
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

    deleteJournalMessage: function(messageId) {
        if (!Journal.findOne(messageId)) {
            throw new Meteor.Error('invalid-journal-message', 'message does not exist', messageId);
        } else {
            console.log("deleting Journal Message", messageId);
            Journal.remove(messageId);
            return true;
        }
    },
});
