import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IncidentsList from '../../components/incidents/list.jsx';
import Loader from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context,clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const showCompleted = LocalState.get('INCIDENTS.SHOW_COMPLETED');
  const error         = LocalState.get('INCIDENTS.SAVE_ERROR');

  const selector = showCompleted ? {} : {closedAt: null};
  if (Meteor.subscribe('incidents.list').ready()) {
    const incidents = Collections.Incidents.find(selector,{sort: {createdAt: -1}}).fetch();
    const openIncidents = Collections.Incidents.find({closedAt: null}).count();
    onData(null, {incidents, showCompleted, openIncidents,error});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  closeIncident: actions.incident.closeIncident,
  toggleShowCompleted: actions.incident.toggleShowCompleted,
  clearErrors: actions.incident.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(IncidentsList);
