Login = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    componentWillMount: function() {
        this.setState({
            email: '',
            password: '',
        });
    },
    handleSubmit(event) {
        event.preventDefault();
        Meteor.loginWithPassword(this.state.email ,  this.state.password , ( error ) => {
            if ( error ) {
                Bert.alert( error.reason, 'warning' );
            } else {
                Bert.alert( 'Logged in!', 'success' );
            }
        });
    },
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <h4 className="page-header">Login</h4>
                    <form id="login" className="login" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" ref="email" className="form-control" placeholder="Email Address" valueLink={this.linkState('email')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Passwort</label>
                            <input type="password" ref="password" className="form-control" placeholder="Password" valueLink={this.linkState('password')} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});
