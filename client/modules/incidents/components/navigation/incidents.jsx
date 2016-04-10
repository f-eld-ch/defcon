import React from 'react';

export default class extends React.Component {

  getMenuForIncident() {
    const {incident} = this.props;
    return (
        <li className="dropdown">
          <a href="/incident" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-lg fa-ambulance"></i>&nbsp; Ereignis
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu"role="menu">
            <li><a href="/incidents/add"><i className="fa fa-plus-circle"></i>&nbsp; Erstellen</a></li>
            <li><a href="/incidents/{incident}/edit">Bearbeiten</a></li>
            <li><a href="/incidents"><i className="fa fa-th-list"></i>&nbsp; Alle Ereignisse</a></li>
          </ul>
        </li>
    );
  }

  getMenu() {
    const {incident} = this.props;
    return (
        <li className="dropdown">
          <a href="/incident" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-lg fa-ambulance"></i>&nbsp; Ereignis<span className="caret"></span>
          </a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="/incidents/add"><i className="fa fa-plus-circle"></i>&nbsp; Erstellen</a></li>
            <li><a href="/incidents"><i className="fa fa-th-list"></i>&nbsp; Alle Ereignisse</a></li>
          </ul>
        </li>
    );
  }

  render() {
    const {incident} = this.props;
    return incident
      ? this.getMenuForIncident()
      : this.getMenu();
  }
}
