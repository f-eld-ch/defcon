Login = React.createClass({
    handleSubmit(event) {
        event.preventDefault();
        let email    = $( '[name="emailAddress"]' ).val(),
            password = $( '[name="password"]' ).val();

        Meteor.loginWithPassword( email, password, ( error ) => {
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
                            <label htmlFor="emailAddress">Email Address</label>
                            <input type="email" name="emailAddress" className="form-control" placeholder="Email Address"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Passwort</label>
                            <input type="password" name="password" className="form-control" placeholder="Password"/>
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
