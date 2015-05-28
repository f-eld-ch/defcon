Template.incident.helpers({
    incident: function() {
        return Incidents.find({closedAt: null}, {
            sort: {
                createdAt: -1
            }
        });
    },
    incidentCount: function() {
        return Incidents.find({closedAt: null}).count();
    },
    formatDate: function (date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
});
