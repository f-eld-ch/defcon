import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import Journal from '../components/journal_add.jsx';
import Loader from '/client/modules/core/components/loader/loader.jsx';

export const composer = ({context, clearErrors, messageId}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const error = LocalState.get('JOURNAL.SAVE_ERROR');
  const selector = {_id: messageId};
  if (Meteor.subscribe('journal.single', messageId).ready()) {
    const messages = Collections.Journal.find(selector).fetch();
    onData(null, {messages, error});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  update: actions.journal.update,
  deleteMessage: actions.journal.deleteAndGo,
  clearErrors: actions.journal.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer,Loader),
  useDeps(depsMapper)
)(Journal);
