import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import {logger} from '/server/lib/logger';

export default() => {
  if (Meteor.users.find().count() === 0) {
    logger.info("creating default user account");
    if (Meteor.settings.admin) {
      Accounts.createUser({username: Meteor.settings.admin.email, email: Meteor.settings.admin.email, password: Meteor.settings.admin.password});
    } else {
      Accounts.createUser({username: 'admin@localhost', email: 'admin@localhost', password: 'secretPassword'});
    }
  }
};
