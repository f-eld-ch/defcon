AppHeader = React.createClass({
    getMeteorData: function() {
      return {
        currentUser: Meteor.user(),
      };
    },
    brandLink: function() {
        if ( !Meteor.loggingIn() && !Meteor.userId() ) {
            return FlowHelpers.pathFor('login');
        }

        return FlowHelpers.pathFor('incident');
    },
    navigationItems: function() {
        if ( !Meteor.loggingIn() && Meteor.user() ) {
            return <AuthenticatedNavigation />;
        } else {
            return <PublicNavigation />;
        }
    },
    render: function() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
                            <span className="sr-only">
                                Toggle navigation
                            </span>
                            <span className="icon-bar">
                            </span>
                            <span className="icon-bar">
                            </span>
                            <span className="icon-bar">
                            </span>
                        </button>
                        <a className="navbar-brand" href={this.brandLink()}><span className="glyphicons glyphicons-hazard">DefCon</span></a>
                    </div>
                    {this.navigationItems()}
                </div>
            </nav>
        );
    }
});
