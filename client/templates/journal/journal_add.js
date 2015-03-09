Template.journalAdd.events({
    "submit .add-journal-entry": function (event) {
        console.log("Add journal entry");
        // This function is called when the new task form is submitted
        var text = event.target.text.value;
        var sender = event.target.sender.value;
        var receiver = event.target.receiver.value;

        Journal.insert({
            text: text,
            sender: sender,
            receiver: receiver,
            createdAt: moment() // current time
        });

        // Clear form
        event.target.sender.value = "";
        event.target.receiver.value = "";
        event.target.text.value = "";


        // Prevent default form submit
        return false;
    }
});