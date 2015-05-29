Incidents = new Mongo.Collection("incidents");

Incidents.deny({
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

NonEmptyString = Match.Where(function(x) {
    check(x, String);
    return x.length > 0;
});

validateIncident = function(incident) {
    if (!Match.test(incident.name, NonEmptyString)) {
        throw new Meteor.Error('invalid-incident', 'Namen für Ereignis fehlt', incident);
    }
    if (!Match.test(incident.location, NonEmptyString)) {
        throw new Meteor.Error('invalid-incident', 'Ort für Ereignis fehlt', incident);
    }
}

Meteor.methods({
    addIncident: function(incident) {

        validateIncident(incident);
        if (Meteor.isServer) {
            logger.info("creating new Incident");
        }

        Incidents.insert({
            createdAt: new Date(),
            name: incident.name,
            location: incident.location,
            closedAt: null,
        });

        return true;
    },

    updateIncident: function(incident) {

        validateIncident(incident);
        if (Meteor.isServer) {
            logger.info("editing Incident", incident._id);
        }

        if (!Incidents.findOne(incident._id)) {
            throw new Meteor.Error('invalid-incident', 'incident does not exist', incident._id);
        } else {
            Incidents.update(incident._id, {
                $set: {
                    name: incident.name,
                    location: incident.location,
                }
            });
        }
    },

    closeIncident: function(id) {
        if (!Incidents.findOne(id)) {
            throw new Meteor.Error('invalid-incident', 'incident does not exist', id);
        } else {
            if (Meteor.isServer) {
                logger.debug("closing Journal Message", id);
            }
            Incidents.update(id, {
                $set: {
                    closedAt: new Date(),
                }
            });
            return true;
        }
    },
});
