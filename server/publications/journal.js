import {Journal} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('journal.list', function(incident) {
    check(incident, String);
    const options = {
      sort: {
        createdAt: -1
      }
    };
    const selector = {incident};
    return Journal.find(selector, options);
  });

  Meteor.publish('journal.item', function(_id) {
    check(_id, String);
    const selector = {_id};
    return Journal.find(selector);
  });

}
