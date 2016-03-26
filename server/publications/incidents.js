import {Incidents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('incidents.list', function() {
    const selector = {};
    const options = {
      sort: {
        createdAt: -1
      }
    };
    return Incidents.find(selector, options);
  });

  Meteor.publish('incidents.single', function(_id) {
    check(_id, String);
    const options = {};
    const selector = {_id};
    return Incidents.find({selector,options});
  });
}
