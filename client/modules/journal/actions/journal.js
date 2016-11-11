export default {
  create({Meteor, LocalState}, sender, receiver, text, createdAt, incident) {
    if (!text) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Text haben.');
    }

    if (!sender) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Sender haben.');
    }

    if (!receiver) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Empfänger haben.');
    }
    if (!incident) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht für unbekanntes Ereignis.');
    }
    if (!createdAt) {
        createdAt = new Date();
    }

    LocalState.set('JOURNAL.SAVE_ERROR', null);

    const id = Meteor.uuid();
    Meteor.call('journal.create', id, sender, receiver ,text, createdAt, incident, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/${incident}/journal/write`);
    });
  },

  update({Meteor, LocalState, FlowRouter}, id, sender, receiver, text, createdAt, incident) {
    if (!text) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Text haben.');
    }

    if (!sender) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Sender haben.');
    }

    if (!receiver) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss einen Empfänger haben.');
    }

    if (!id) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht unbekannt. Update nicht möglich!');
    }

    if (!incident) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht für unbekanntes Ereignis.');
    }

    if (!createdAt) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht muss ein gültiges Datum haben.');
    }

    LocalState.set('JOURNAL.SAVE_ERROR', null);

    Meteor.call('journal.update', id, sender, receiver ,text, createdAt, incident, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/${incident}/journal/write`);

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
    if (!message._id) {
      return LocalState.set('JOURNAL.SAVE_ERROR', 'Nachricht unbekannt. Löschen nicht möglich!');
    }

    LocalState.set('JOURNAL.SAVE_ERROR', null);
    Meteor.call('journal.delete', message._id, (err) => {
      if (err) {
        return LocalState.set('JOURNAL.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/${message.incident}/journal/write`);
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
