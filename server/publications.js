Meteor.publish('journal', function(incident) {
    logger.debug("publishing journal for incident", incident);
    return Journal.find({
        incident: incident,
    });
});

Meteor.publish('journalItem', function(id) {
    logger.debug("publishing journal for item", id);
    return Journal.find({
        _id: id,
    });
});

Meteor.publish('allIncidents', function() {
    console.log("all incident publication");
    return Incidents.find();
});

Meteor.publish('incident', function(id) {
    console.log("only one incident publication");
    return Incidents.find({_id: id});
});
