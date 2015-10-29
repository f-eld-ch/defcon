const publicRedirect = () => {
    if ( Meteor.userId() ) {
        FlowRouter.go( '/incident' );
    }
    else {
        FlowRouter.go( '/login' );
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/', {
    triggersEnter: [function(context, redirect) {
      redirect('/login');
    }],
    action() {
    }
});

publicRoutes.route( '/login', {
    name: 'login',
    action() {
        ReactLayout.render( Default, { yield: <Login /> } );
    }
});
