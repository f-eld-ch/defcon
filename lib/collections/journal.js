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

Meteor.methods({
    addJournalMessage: function(message) {

        if (!_.isString(message.incident) || !Incidents.findOne(message.incident)) {
            throw new Meteor.Error('invalid-journal', 'Message belongs to unexisting incident:', message.incident);
        } else if (!_.isString(message.sender)) {
            throw new Meteor.Error('invalid-journal', 'Message sender is not a string:', message.sender);
        } else if (!_.isString(message.receiver)) {
            throw new Meteor.Error('invalid-journal', 'Message Name is not a string:', message.receiver);
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
        if (!Journal.findOne(message._id)) {
            throw new Meteor.Error('invalid-journal-message', 'message does not exist', message._id);
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
            throw new Meteor.Error('invalid-journal-message', 'message does not exist', id);
        } else {
            console.log("deleting Journal Message", id);
            Journal.remove(id);
            return true;
        }
    },
});
