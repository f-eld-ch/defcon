const publicRedirect = () => {
    if ( Meteor.userId() ) {
        FlowRouter.go( 'incident' );
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/signup', {
    name: 'signup',
    action() {
        ReactLayout.render( Default, { yield: <Signup /> } );
    }
});

publicRoutes.route( '/login', {
    name: 'login',
    action() {
        ReactLayout.render( Default, { yield: <Login /> } );
    }
});
