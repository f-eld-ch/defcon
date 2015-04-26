Template.journalItem.events({
    "submit .update-journal-entry": function (event) {
        event.preventDefault();
        console.log("Update journal entry");
        // This function is called when the new task form is submitted
        var text = event.target.text.value;
        var sender = event.target.sender.value;
        var receiver = event.target.receiver.value;

        Journal.update(this._id, {
            $set: {
                text: text,
                sender: sender,
                receiver: receiver,
            }
        });

        Router.go('journal');
    }
});