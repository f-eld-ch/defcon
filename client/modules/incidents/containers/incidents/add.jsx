import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import NewIncident from '../../components/incidents/add.jsx';
import Loader from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('INCIDENTS.SAVE_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.incident.add,
  clearErrors: actions.incident.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(NewIncident);
