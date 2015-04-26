Router.configure({
    layoutTemplate: 'layout',
    waitOn: function () {
        return Meteor.subscribe('journal');
    },
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/journal', {
    name: 'journal'
});

Router.route('/journal/:_id', {
    name: 'journalItem',
    data: function () {
        return Journal.findOne(this.params._id);
    },
});


Router.onBeforeAction('dataNotFound', {
    only: 'journalItem'
});