Meteor.publish('journal', function(incident) {
    return Journal.find({
        incident: incident,
    });
});

Meteor.publish('journalItem', function(id) {
    return Journal.find({
        _id: id,
    });
});

Meteor.publish('allIncidents', function() {
    return Incidents.find();
});

Meteor.publish('incident', function(id) {
    return Incidents.find({_id: id});
});
