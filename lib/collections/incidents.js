Incidents = new Mongo.Collection('incidents');

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
    // check that the createdAt time is before the current time plus 10seconds slack
    let now = moment().add(10,'seconds');
    if (moment(incident.createdAt).isAfter(now)) {
        throw new Meteor.Error('invalid-journal', 'Zeit ist in der Zukunft', incident);
    }
};

Meteor.methods({
    addIncident: function(incident) {

        validateIncident(incident);
        if (Meteor.isServer) {
            logger.info('creating new Incident');
        }

        Incidents.insert({
            createdAt: incident.createdAt ? incident.createdAt : new Date(),
            name: incident.name,
            location: incident.location,
            closedAt: null,
        });

        return true;
    },

    updateIncident: function(id, incident) {

        validateIncident(incident);
        if (Meteor.isServer) {
            logger.info('editing Incident ', id);
        }

        if (!Incidents.findOne(id)) {
            throw new Meteor.Error('invalid-incident', 'incident does not exist', id);
        } else {
            Incidents.update(id, {
                $set: {
                    createdAt: incident.createdAt,
                    name: incident.name,
                    location: incident.location,
                }
            });
        }
    },

    // Close open and open closed incidents
    toggleClosedIncident: function(id) {
        let incident = Incidents.findOne(id);
        console.log("closing incident");
        if (!incident) {
            throw new Meteor.Error('invalid-incident', 'incident does not exist', id);
        } else {
            let date = new Date();
            if (incident.closedAt) {
                console.log("incident reopened at " + date );
                Incidents.update(id, {
                    $set: {
                        closedAt: null,
                    }
                });
            } else {
                Incidents.update(id, {
                    $set: {
                        closedAt: date,
                    }
                });
                console.log("incident setting closedAt: " + date );

            }
            return true;
        }
    },
});
