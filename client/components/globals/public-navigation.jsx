PublicNavigation = React.createClass({
    render() {
        return (
            <div
                id="navbar-collapse"
                className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className={FlowHelpers.currentRoute( 'login' )}>
                        <a href={FlowHelpers.pathFor( 'login' )}>Login</a>
                    </li>
                </ul>
            </div>
        );
    }
});
