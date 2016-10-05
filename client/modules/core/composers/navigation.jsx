import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';

const composer = ({context,incidentId}, onData) => {

  const {Meteor, LocalState} = context();

  if (Meteor.subscribe('users.current').ready()) {
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());
    const email = _.get(user, 'emails[0].address', null);
    onData(null, {loggedIn, user, email, incidentId});
  }

};

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps()
  )(component);
