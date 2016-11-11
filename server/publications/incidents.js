import {Incidents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {logger} from '/server/lib/logger.js';

export default function() {
  Meteor.publish('incidents.list', function() {
    if (!this.userId) {
      logger.debug("unauthorized publication for incidents.list");
      return this.ready();
    }

    const selector = {};
    const options = {
      sort: {
        createdAt: -1
      }
    };
    return Incidents.find(selector, options);
  });

  Meteor.publish('incidents.single', function(incidentId) {
    if (!this.userId) {
      logger.debug("unauthorized publication for incidents.single");
      return this.ready();
    }

    check(incidentId, String);
    const selector = {
      _id: incidentId
    };
    logger.info("publication for incidents.single for id", incidentId);
    return Incidents.find({selector});
  });
}
