export default {
  create({Meteor, LocalState}, message) {
    if (!message.text) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Text haben.');
    }

    if (!message.sender) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Sender haben.');
    }

    if (!message.receiver) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Empfänger haben.');
    }

    LocalState.set('JOURNAL.SAVE_ERROR', null);

    const id = Meteor.uuid();
    Meteor.call('journal.create', id, message, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
    });
  },

  toggleShowAll({LocalState}) {
    const state = LocalState.get('JOURNAL.SHOW_ALL');
    LocalState.set('JOURNAL.SHOW_ALL', !state);
  },

  togglePriority({LocalState,Meteor}, id) {
      Meteor.call('journal.togglePriority', id, (err) => {
        if (err) {
          return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
        }
      });
  },

  clearErrors({LocalState}) {
    return LocalState.set('JOURNAL.SAVE_ERROR', null);
  }
};
