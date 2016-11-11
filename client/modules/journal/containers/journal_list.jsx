import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import JournalList from '../components/journal_list.jsx';
import Loader from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context, clearErrors, incidentId, showControls}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const error   = LocalState.get('JOURNAL.SAVE_ERROR');
  const showAll = LocalState.get('JOURNAL.SHOW_ALL');
  if (showAll === undefined) {
      LocalState.set('JOURNAL.SHOW_ALL', true);
  }

  const selector = showAll ? {incident: incidentId} : {incident: incidentId, priority: true};
  if (Meteor.subscribe('journal.list', incidentId).ready()) {
    const messages = Collections.Journal.find(selector, {sort: {createdAt: -1}}).fetch();

    onData(null, {messages, showAll, error});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  clearErrors: actions.journal.clearErrors,
  toggleShowAll: actions.journal.toggleShowAll,
  togglePriority: actions.journal.togglePriority,
  deleteMessage: actions.journal.deleteMessage,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(JournalList);
