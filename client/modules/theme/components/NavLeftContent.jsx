import React from 'react';
import DropDown from './NavElemDropDown.jsx';
import FlowRouter from '../actions/route_helper';

export default() => {

  var usermenu = [];
  usermenu.push({url: '/users', name: '/users'});
  usermenu.push({url: '/users/add', name: '/users/add'});
  let navAdmin = React.createElement(DropDown, {
    name: 'User Admin',
    links: usermenu
  });

  var links5 = [];
  links5.push({url: '/login', name: 'Login'});
  links5.push({url: '/password', name: 'Forgot passoword'});
  links5.push({url: '/register', name: 'Register'});
  links5.push({url: '/Logout', name: 'Logout'});

  links5.push({url: '/account', name: 'Account'});
  links5.push({url: '/profile', name: 'Profile'});
  let navAccounts = React.createElement(DropDown, {
    name: 'Accounts',
    links: links5
  });
  return (
    <ul className="nav navbar-nav">
      <li className={FlowHelpers.currentRoute('incidentEditor')}>
        <a href={FlowHelpers.pathFor('incidentEditor', {incident: Session.get('incident')})}>
          <i className="fa fa-lg fa-ambulance"></i>&nbsp; Ereignisse</a>
      </li>
      <li className={FlowHelpers.currentRoute('journal')}>
        <a href={FlowHelpers.pathFor('journal', {incident: Session.get('incident')})}>
          <i className="fa fa-lg fa-bars"></i>&nbsp; Journal
        </a>
      </li>
      <li className="disabled">
        <a href={FlowHelpers.pathFor('incident')}>
          <i className="fa fa-lg fa-check-square-o"></i>&nbsp; Pendenzen
        </a>
      </li>
      <li className="disabled">
        <a href={FlowHelpers.pathFor('incident')}>
          <i className="fa fa-lg fa-male"></i>&nbsp; Mitteltablle
        </a>
      </li>

      {navAccounts}
      {Meteor.userId() ? navAdmin : null}
    </ul>
  );

};
