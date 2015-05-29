Template.incident.helpers({
    incident: function() {
        return Incidents.find({closedAt: null}, {
            sort: {
                createdAt: -1
            }
        });
    },

    incidentCount: function() {
        var count = Incidents.find({closedAt: null}).count();
        if (count == 0){
            Errors.throw("Keine offenen Ereignisse");
        }
        return count;
    },

    formatDate: function (date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
});
