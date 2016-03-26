import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.publish('users.collection', function() {
    const selector = {};
    const options = {
      sort: {
        createdAt: -1
      }
    };
    const response = Meteor.users.find(selector, options);
    return response;
  });

  Meteor.publish('users.single', function(_id) {
    check(_id, String);
    const selector = {_id};

    const response = Meteor.users.find(selector);
    return response;
  });

  Meteor.publish('users.current', function(_id) {
    check(_id, String);
    const selector = {_id};
    const response = Meteor.users.find(selector);
    return response;
  });
}
