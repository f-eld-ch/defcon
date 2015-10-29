AuthenticatedNavigation = React.createClass({
    currentUserEmail() {
        return Meteor.user().emails[0].address;
    },
    render() {
        return (
            <div
                id="navbar-collapse"
                className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className="dropdown">
                        <a
                            href={FlowHelpers.pathFor( 'incident' )}
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-expanded="false">
                            <i className="glyphicon glyphicon-fire"> Ereignisse</i>
                        </a>
                        <ul className="dropdown-menu">
                            <li className={FlowHelpers.currentRoute( 'incident' )}>
                                <a href={FlowHelpers.pathFor( 'incident' )}>
                                    <i className="glyphicon glyphicon-tower">
                                        Aktuelle Ereignisse
                                    </i>
                                </a>
                            </li>
                            <li className={FlowHelpers.currentRoute( 'incidentAdd' )}>
                                <a href={FlowHelpers.pathFor( 'incidentAdd' )}>
                                    <i className="glyphicon glyphicon-plus-sign"> Neues Ereignis</i>
                                </a>
                            </li>
                        </ul>
                    </li>
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
