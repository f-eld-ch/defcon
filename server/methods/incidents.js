import {Incidents} from '/lib/collections';
import {logger} from '/server/lib/logger.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
      'incidents.create' ( _id, name, location, createdAt) {
        logger.info('adding new incident by User ', Meteor.uuid() );

        check(_id, String);
        check(name, String);
        check(location, String);

        createdAt = createdAt ? createdAt : new Date();
        check(createdAt, Date);

        const incident = {
          name,
          location,
          createdAt
        };
        // insert the new incident
        Incidents.insert(incident);
      },
      'incidents.update' (id, incident) {
        logger.info('editing Incident ', id , ' incident ', incident );

        check(id, String);
        check(incident, {
          name: String,
          location: String,
          createdAt: Date
        });
        const selector = {
          _id: id
        };
        logger.info('editing Incident ', id , ' by User ', Meteor.uuid() );
        const currentIncident = Incidents.findOne(selector);
        if (!currentIncident) {
          throw new Meteor.Error('invalid-incident', 'incident does not exist', id);
        } else {
          Incidents.update(selector, {
            $set: {
              name: incident.name,
              location: incident.location,
              createdAt: incident.createdAt,
              closedAt: incident.closedAt ? incident.closedAt : currentIncident.closedAt
            }
          });
        }
      },
      // toggle closedAt,
      // i.e. open closed incidents and close open incident
      'incidents.toggleClose' (id) {
        check(id, String);

        const incident = Incidents.findOne({_id: id});
        if (!incident) {
          throw new Meteor.Error('invalid-incident', 'incident does not exist', id);
        } else {
          const date = new Date();
          if (incident.closedAt) {
            logger.info('Reopening Incident', id);
            Incidents.update(incident._id, {
              $set: {
                closedAt: null
              }
            });
          } else {
            logger.info('Closing Incident', id);
            Incidents.update(incident._id, {
              $set: {
                closedAt: date
              }
            });
          }
          return true;
        }
      }
  });
}
