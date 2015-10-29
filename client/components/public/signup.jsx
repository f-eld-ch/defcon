Signup = React.createClass({
    componentDidMount() {

    },
    handleSubmit(event) {
            event.preventDefault();
            console.log("handleSubmit");
            this.createUser();
    },
    createUser(){
        let user = {
            email: $('[name="emailAddress"]').val(),
            password: $('[name="password"]').val()
        };

        console.log("Creating User");
        Accounts.createUser(user, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Welcome!', 'success');
            }
        });
    },
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <h4 className="page-header">Sign Up</h4>
                    <form id="signup" className="signup" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emailAddress">Email Address</label>
                            <input type="email" name="emailAddress" className="form-control" placeholder="Email Address"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Passwort</label>
                            <input type="password" name="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Sign Up"/>
                        </div>
                    </form>
                    <p>Already have an account?
                        <a href="/login">Log In</a>.</p>
                </div>
            </div>
        );
    }
});
