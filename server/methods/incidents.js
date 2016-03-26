import {Incident} from '/lib/collections';
import {logger} from '/server/lib/logger.js';
import {Meteor} from 'meteor/meteor';
import {check,Match} from 'meteor/check';

export default function () {
  Meteor.methods({
      'incident.create' (incident) {
        check(incident, {
          name: String,
          location: String,
          createdAt: Match.Optional(Date),
          closedAt: Match.Optional(Date)
        });

        const createdAt = incident.createdAt ? incident.createdAt : new Date();
        const closedAt = incident.closedAt ? incident.closedAt : null;
        const newincident = {
          name,
          location,
          createdAt,
          closedAt
        };
        // insert the new incident
        Incident.insert(newincident);
      },
      'incident.update' (_id, incident) {
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
        if (Meteor.isServer) {
          logger.info('editing Incident ', _id);
        }
        if (!Incident.findOne(selector)) {
          throw new Meteor.Error('invalid-incident', 'incident does not exist', _id);
        } else {
          Incident.update(selector, {
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
      'incident.toggleClose' (_id) {
        check(_id, String);
        const selector = {
          _id
        };
        const incident = Incident.findOne(selector);
        if (!incident) {
          throw new Meteor.Error('invalid-incident', 'incident does not exist', _id);
        } else {
          const date = new Date();
          if (incident.closedAt) {
            Incident.update(_id, {
              $set: {
                closedAt: null
              }
            });
          } else {
            Incident.update(_id, {
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
