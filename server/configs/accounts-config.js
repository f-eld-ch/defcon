import { Accounts } from 'meteor/std:accounts-ui';

export default() => {

  Accounts.config({
    sendVerificationEmail: false,
    forbidClientAccountCreation: true
  });
}
