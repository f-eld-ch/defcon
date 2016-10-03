import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import Incident from '../../components/incidents/incident.jsx';
import Loader   from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context, incidentId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('incidents.single', incidentId).ready()) {
    const incident = Collections.Incidents.findOne({_id: incidentId});
    onData(null, {incident});
  }

};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.incident.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(Incident);
