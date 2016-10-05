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

  update({Meteor, LocalState, FlowRouter}, message) {
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

    Meteor.call('journal.update', message, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/${message.incident}/journal`);
    });
  },

  deleteMessage({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht unbekannt. Löschen nicht möglich!');
    }

    LocalState.set('JOURNAL.SAVE_ERROR', null);
    console.log('deleting message ', id);
    Meteor.call('journal.delete', id, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
    });
  },

  deleteAndGo({Meteor, LocalState, FlowRouter}, message) {
    if (!id) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht unbekannt. Löschen nicht möglich!');
    }

    LocalState.set('JOURNAL.SAVE_ERROR', null);
    Meteor.call('journal.delete', message._id, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/${message.incident}/journal`);
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
