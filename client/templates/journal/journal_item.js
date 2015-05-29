Template.journalItem.events({
    "submit .update-journal-entry": function(event) {
        event.preventDefault();
        console.log("Update journal entry");
        // This function is called when the new task form is submitted

        var message = {
            _id: Router.current().params._id,
            text: event.target.text.value,
            sender: event.target.sender.value,
            receiver: event.target.receiver.value,
        };


        Meteor.call("updateJournalMessage", message, function(error, result) {
            if (error) {
                return Errors.throw(error.reason);
            }
            else {
                Router.go('journal', {
                    incident: Router.current().params.incident
                });
            }
        });
    },
    'click .delete': function(event) {
        event.preventDefault();

        if (confirm("Diese Nachricht löschen?")) {
            var id = this._id;
            console.log("Delete journal entry", id);
            Meteor.call("deleteJournalMessage", id, function(error, result) {
                if (error) {
                    return Errors.throw(error.reason);
                }
                else {
                    Router.go('journal', {
                        incident: Router.current().params.incident
                    });
                }
            });
        }
    },

});
