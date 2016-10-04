import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IncidentNav from '../../components/navigation/incidents.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const incident = LocalState.get('INCIDENT');
  if (!incident) {
    return onData(null,{})
  }

  if (Meteor.subscribe('incidents.single', incident).ready()) {
    const incident = Collections.Incidents.findOne({_id: incidentId});
    onData(null, {incident});
  }
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.incident.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IncidentNav);
