import moment from 'moment';

export default {

  // create
  add({Meteor, LocalState, FlowRouter}, name, location, createdAt) {
    if (!name || !location) {
      return LocalState.set('INCIDENTS.SAVE_ERROR', 'Name und Ort müssen angegeben werden.');
    }

    if (createdAt && ! moment(createdAt).isValid()){
        return LocalState.set('INCIDENTS.SAVE_ERROR', 'Erstellungsdatum ist nicht gültig.');
    }

    LocalState.set('INCIDENTS.SAVE_ERROR', null);

    const id = Meteor.uuid();
    Meteor.call('incidents.create', id, name, location, createdAt, (err) => {
      if (err) {
        return LocalState.set('INCIDENTS.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents`);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter}, id, name, location, createdAt, closedAt) {
    if (!name || !location) {
      return LocalState.set('INCIDENTS.SAVE_ERROR', 'Name und Ort müssen angegeben werden.');
    }

    if (createdAt && ! moment(createdAt).isValid()){
        return LocalState.set('INCIDENTS.SAVE_ERROR', 'Erstellungsdatum ist nicht gültig.');
    }

    const incident = {name: name, location: location, createdAt: createdAt, closedAt: closedAt};
    Meteor.call('incidents.update', id, incident, (err) => {
      if (err) {
        return LocalState.set('INCIDENTS.SAVE_ERROR', err.message);
      }
      LocalState.set('INCIDENTS.SAVE_ERROR', null);
      FlowRouter.go(`/incidents/`);
    });
  },

  delete({Meteor, LocalState, FlowRouter}, _id) {
    Meteor.call('incidents.delete', _id, (err) => {
      if (err) {
        return LocalState.set('INCIDENTS.SAVE_ERROR', err.message);
      }
      LocalState.set('INCIDENTS.SAVE_ERROR', null);
      FlowRouter.go(`/incidents/`);
    });

  },

  toggleShowCompleted({LocalState}) {
    const state = LocalState.get('INCIDENTS.SHOW_COMPLETED');
    LocalState.set('INCIDENTS.SHOW_COMPLETED', !state);
  },

  // clearError
  clearErrors({LocalState}) {
    LocalState.set('INCIDENTS.SAVE_ERROR', null);
  },

  closeIncident({Meteor, LocalState,FlowRouter}, id ) {
    if ( !id ){
      return LocalState.set('INCIDENTS.SAVE_ERROR', 'Unbekanntes Ereignis kann nicht geschlossen werden');
    }

    Meteor.call('incidents.toggleClose', id, (err) => {
      if (err) {
        return LocalState.set('INCIDENTS.SAVE_ERROR', err.message);
      }
      LocalState.set('INCIDENTS.SAVE_ERROR', null);
      FlowRouter.go(`/incidents/`);
    });
  }
};
