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
            yield: <IncidentsManager />
        });
    }
});

authenticatedRoutes.route('/incident/:incident', {
    name: 'incidentEditor',
    action(params) {
        ReactLayout.render(Default, {
            yield: <IncidentEditor id={params.incident} />
        });
    }
});

authenticatedRoutes.route('/incident/:incident/journal', {
    name: 'journal',
    action(params) {
        ReactLayout.render(Default, {
            yield: <Journal incident={params.incident} />
        });
    }
});
