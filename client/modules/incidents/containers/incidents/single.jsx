import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import Incident from '../../components/incidents/incident.jsx';
import Loader from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context, clearErrors, incidentId}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.subscribe('incidents.list').ready()) {
    const incident = Collections.Incidents.findOne({_id: incidentId});
    onData(null, {incident,error});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  update: actions.incident.update,
  closeIncident: actions.incident.closeIncident,
  clearErrors: actions.incident.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(Incident);
