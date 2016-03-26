import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {logger} from '/server/lib/logger';
// import _ from 'lodash';

export default function() {
  Meteor.methods({

    '_users.add' (data) {
        logger.error("undefined call method to _users.add");
        return data;

    },

    '_users.update' (data, _id) {
        logger.error("undefined call method to _users.update");
        return _id;

    },

    '_users.delete' (_id) {
        logger.error("undefined call method to _users.delete");
        return _id;
    }
  });
}
