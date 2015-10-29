const publicRedirect = () => {
    if ( Meteor.userId() ) {
        FlowRouter.go( 'incident' );
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/login', {
    name: 'login',
    action() {
        ReactLayout.render( Default, { yield: <Login /> } );
    }
});
