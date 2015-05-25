Template.journalTable.helpers({
    journalentry: function () {
        return Journal.find({}, {
            sort: {
                createdAt: -1
            }
        });
    },

    formatDate: function (date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
});
