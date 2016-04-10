export default {

  // create
  add({Meteor, LocalState, FlowRouter}, name, location, createdAt) {
    const id = Meteor.uuid();
    Meteor.call('incidents.create', id, name, location, createdAt, (err) => {
      if (err) {
        return LocalState.set('incidents.SAVE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/${id}`);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter}, data, _id) {
    Meteor.call('incident.update', data, _id, (err) => {
      if (err) {
        return LocalState.set('incidents.SAVE_ERROR', err.message);
      }
    });
  },

  delete({Meteor, LocalState, FlowRouter}, _id) {
    Meteor.call('incidents.delete', _id, (err) => {
      if (err) {
        return LocalState.set('incidents.DELETE_ERROR', err.message);
      }
      FlowRouter.go(`/incidents/`);

    });
  },

  toggleShowCompleted({Meteor, LocalState}) {
    const state = LocalState.get('incidents.SHOW_COMPLETED');
    LocalState.set('incidents.SHOW_COMPLETED', !state);
  },

  // clearError
  clearErrors({LocalState}) {
    LocalState.set('incidents.DELETE_ERROR', null);
    return LocalState.set('incidents.SAVE_ERROR', null);
  }



};
