// import {Colors} from '/imports/configs/collections';
import {Meteor} from 'meteor/meteor';
//import {check} from 'meteor/check';

export default function () {

  Meteor.publish('users.current', function (_id) {
    const selector = {_id};
    const response = Meteor.users.find(selector);
    return response;
  });
}
