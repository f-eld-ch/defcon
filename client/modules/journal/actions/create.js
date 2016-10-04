export default {
  create({Meteor, LocalState}, message) {
    if (!message.text) {
      return LocalState.set('CREATE_JOURNAL_ERROR', 'Nachricht muss einen Text haben.');
    }

    if (!message.sender) {
      return LocalState.set('CREATE_JOURNAL_ERROR', 'Nachricht muss einen Sender haben.');
    }

    if (!message.receiver) {
      return LocalState.set('CREATE_JOURNAL_ERROR', 'Nachricht muss einen Empfänger haben.');
    }

    LocalState.set('CREATE_JOURNAL_ERROR', null);

    const id = Meteor.uuid();
    Meteor.call('journal.create', id, postId, text, (err) => {
      if (err) {
        return LocalState.set('CREATE_JOURNAL_ERROR', err.message);
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('CREATE_JOURNAL_ERROR', null);
  }
};
