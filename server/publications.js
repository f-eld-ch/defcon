Meteor.publish('journal', function () {
    return Journal.find({
        incident: this.incident,
    });
});

Meteor.publish('incidents', function () {
    return Incidents.find();
});