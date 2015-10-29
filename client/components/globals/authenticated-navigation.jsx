AuthenticatedNavigation = React.createClass({
    currentUserEmail() {
        return Meteor.user().emails[0].address;
    },
    renderIncidentMenu: function() {
        if (Session.get('incident')){
            return (
                <li className={FlowHelpers.currentRoute( 'journal' )}>
                    <a href={FlowHelpers.pathFor( 'journal', {incident: Session.get('incident')} )}>
                        <i className="fa fa-bars"> Journal</i>
                    </a>
                </li>
            );
        }
    },
    render() {
        return (
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className={FlowHelpers.currentRoute( 'incident' )}>
                        <a href={FlowHelpers.pathFor( 'incident' )}>
                            <i className="fa fa-ambulance"> Ereignisse</i>
                        </a>
                    </li>
                    {this.renderIncidentMenu()}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            {this.currentUserEmail()}
                            <span className="caret">
                            </span>
                        </a>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={Meteor.logout}>
                                <a href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
});
