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
    return Incidents.find();
});

Meteor.publish('openIncidents', function() {

    // only return the incidents which dont have a closedAt set
    // strictly speeking we would also have to check that
    // closedAt is in the past but that will be enforced on the
    // close method side
    //return Incidents.find({closedAt: { $exists: false}});
    var count = Incidents.find().count();
    logger.debug('publishing open incidents ( current open incidents:', count, ')');
    return Incidents.find();

});
