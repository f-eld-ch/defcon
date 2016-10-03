import React from 'react';

export default class extends React.Component {

  getLoggedin() {
    const {email} = this.props;
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle"
            data-toggle="dropdown"><i className="fa fa-user"></i>&nbsp; {email} <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="/profile"><i className="fa fa-cog fa-spin"></i>&nbsp; Profil</a></li>
            <li><a href="/account"><i className="fa fa-user"></i>&nbsp; Account</a></li>
            <li><a href="/logout"><i className="fa fa-sign-out"></i>&nbsp; Logout</a></li>
          </ul>
        </li>
      </ul>
    );
  }

  getGuest() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/login"><i className="fa fa-sign-in"></i>&nbsp; Login</a></li>
      </ul>
    );
  }

  render() {
    const {loggedIn} = this.props;
    return loggedIn ? this.getLoggedin() : this.getGuest();
  }
}
