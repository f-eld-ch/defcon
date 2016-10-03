import { Accounts } from 'meteor/std:accounts-ui';

export default function ({FlowRouter}) {
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_AND_EMAIL',
      loginPath: '/incidents',
      onSignedInHook: () => FlowRouter.go('/incidents'),
      onSignedOutHook: () => FlowRouter.go('/')
    });
}
