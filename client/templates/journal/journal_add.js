Template.journalAdd.events({
    "submit .add-journal-entry": function (event) {
        console.log("Add journal entry");
        // This function is called when the new task form is submitted
        var text = event.target.text.value;
        var sender = event.target.sender.value;
        var receiver = event.target.receiver.value;

        var message = {
            text: text,
            sender: sender,
            receiver: receiver,
            incident: Router.current().params.incident,
        }

        Meteor.call("addJournalMessage", message, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });

        // Clear form
        event.target.sender.value = "";
        event.target.receiver.value = "";
        event.target.text.value = "";


        // Prevent default form submit
        return false;
    }
});
