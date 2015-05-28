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

Meteor.methods({
    addIncident: function(incident) {

        if (_.isString(incident.name) && _.isString(incident.location)) {
            console.log("creating new Incident");
            Incidents.insert({
                createdAt: new Date(),
                name: incident.name,
                location: incident.location,
                closedAt: null,
            });
        } else {
            throw new Meteor.Error('invalid-incident', 'cannot add incident', incident);
        }

        return true;
    },

    updateIncident: function(incident) {
        console.log("editing Incident", incident._id);
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
            console.log("closing Journal Message", id);
            Incidents.update(id, {
                $set: {
                    closedAt: new Date(),
                }
            });
            return true;
        }
    },
});
