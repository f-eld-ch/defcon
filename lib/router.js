Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('openIncidents');
    }
});

Router.onBeforeAction('dataNotFound', {
    //only: 'journalItem',
});

/*
INCIDENT ROUTES
*/
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

Router.route('/incident/new', {
    name: 'incidentAdd',
    waitOn: function() {
        return Meteor.subscribe('allIncidents');
    },
});

Router.route('/incident/:_id/edit', {
    name: 'incidentEdit',
    data: function() {
        return Incidents.findOne(this.params._id);
    },
});


/*
JOURNAL ROUTES
*/
Router.route('/incident/:incident/journal', {
    name: 'journal',
    waitOn: function() {
        return Meteor.subscribe('journal', this.params.incident);
    },
});

Router.route('/incident/:incident/journal/:_id', {
    name: 'journalItem',
    data: function() {
        return Journal.findOne(this.params._id);
    },
    waitOn: function() {
        return Meteor.subscribe('journal', this.params.incident);
    },
});
