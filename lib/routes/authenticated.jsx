const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'login' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route('/incident', {
    name: 'incident',
    action() {
        ReactLayout.render(Default, {
            yield:  <IncidentEdit />,
            bottom: <IncidentsTable />
        });
    }
});

authenticatedRoutes.route('/incident/:incident', {
    name: 'incidentEditor',
    action(params) {
        ReactLayout.render(Default, {
            yield:  <IncidentEdit incident={params.incident} />,
            bottom: <IncidentsTable />
        });
    }
});

authenticatedRoutes.route('/incident/:incident/journal', {
    name: 'journal',
    action(params) {
        ReactLayout.render(Default, {
            yield:  <JournalEdit incident={params.incident} />,
            bottom: <JournalTable incident={params.incident} />
        });
    }
});

authenticatedRoutes.route('/incident/:incident/journal/:message', {
    name: 'journalEditor',
    action(params) {
        ReactLayout.render(Default, {
            yield:  <JournalEdit message={params.message} incident={params.incident} />,
            bottom: <JournalTable incident={params.incident} />
        });
    }
});
