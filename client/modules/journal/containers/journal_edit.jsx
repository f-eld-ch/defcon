import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import JournalEditor from '../components/journal_editor.jsx';
import Loader from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context, clearErrors, incidentId, messageId}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('JOURNAL.SAVE_ERROR');

  const selector = {_id: messageId};
  if (Meteor.subscribe('journal.single', messageId).ready()) {
    const message = Collections.Journal.findOne(selector);
    onData(null, {message, error});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.journal.create,
  update: actions.journal.update,
  deleteMessage: actions.journal.deleteAndGo,
  clearErrors: actions.journal.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(JournalEditor);
