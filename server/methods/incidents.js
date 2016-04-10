import {Incidents} from '/lib/collections';
import {logger} from '/server/lib/logger.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
      'incidents.create' (_id, name, location, createdAt) {
        logger.info('added new incident ', _id , ' by User ', Meteor.uuid() );

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
        let inc = Incidents.insert(incident);
        logger.info('added new incident ', inc._id , ' by User ', Meteor.uuid() );
        return inc._id;
      },
      'incidents.update' (_id, incident) {
        check(_id, String);
        check(incident, {
          name: String,
          location: String,
          createdAt: Match.Optional(Date),
          closedAt: Match.Optional(Date)
        });
        const selector = {
          _id
        };
        logger.info('editing Incident ', _id , ' by User ', Meteor.uuid() );
        if (!Incidents.findOne(selector)) {
          throw new Meteor.Error('invalid-incident', 'incident does not exist', _id);
        } else {
          Incidents.update(selector, {
            $set: {
              name: incident.name,
              location: incident.location,
              createdAt: incident.createdAt,
              closedAt: incident.closedAt ? incident.closedAt : null
            }
          });
        }
      },
      // toggle closedAt,
      // i.e. open closed incidents and close open incident
      'incidents.toggleClose' (_id) {
        check(_id, String);
        const selector = {
          _id
        };
        const incident = Incidents.findOne(selector);
        if (!incident) {
          throw new Meteor.Error('invalid-incident', 'incident does not exist', _id);
        } else {
          const date = new Date();
          if (incident.closedAt) {
            Incidents.update(_id, {
              $set: {
                closedAt: null
              }
            });
          } else {
            Incidents.update(_id, {
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
