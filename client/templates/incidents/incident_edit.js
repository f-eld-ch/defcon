Template.incidentEdit.events({
    "submit .update-incident-entry": function(event) {
        event.preventDefault();
        console.log("Update Incident entry");
        // This function is called when the new task form is submitted

        var incident = {
            _id: Router.current().params._id,
            name: event.target.name.value,
            location: event.target.location.value,
        };


        Meteor.call("updateIncident", incident, function(error, result) {
            if (error) {
                console.log("error", error);
            }
        });

        Router.go('incident');
    },
    'click .close-incident': function(e) {
        e.preventDefault();

        if (confirm("Dieses Ereignis abschliessen?")) {
            var id = this._id;
            console.log("Closing incident", id);
            Meteor.call("closeIncident", id, function(error, result) {
                if (error) {
                    console.log("error", error);
                }
            });
            Router.go('incident');
        }
    },
});

Template.incidentEdit.helpers({
    formatDate: function (date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
});
