Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('openIncidents');
    }
});

Router.route('/incident', {
    name: 'incident',
    waitOn: function() {
        return Meteor.subscribe('openIncidents');
    },
});
Router.route('/incident/all', {
    name: 'incidentAll',
    waitOn: function() {
        return Meteor.subscribe('allIncidents');
    },
});

Router.route('/incidents/:incident/journal', {
    name: 'journal',
    waitOn: function() {
        return Meteor.subscribe('journal', this.params.incident);
    },
});

Router.route('/incidents/:incident/journal/:_id', {
    name: 'journalItem',
    data: function() {
        return Journal.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('journal', this.params.incident);
    },
});

Router.onBeforeAction('dataNotFound', {
    //only: 'journalItem',
});
