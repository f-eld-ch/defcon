import React from 'react';

export default class extends React.Component {

  getMenuForIncident() {
    const {incidentId} = this.props;
    return (
      <li className="dropdown">
        <a href="/incident" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-lg fa-ambulance"></i>&nbsp; Ereignis
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu">
          <li>
            <a href="/incidents">
              <i className="fa fa-th-list"></i>&nbsp; Alle Ereignisse</a>
          </li>
          <li>
            <a href="/incidents/add">
              <i className="fa fa-plus-circle"></i>&nbsp; Erstellen</a>
          </li>
          <li>
            <a href={`/incidents/${incidentId}/edit`}><i className="fa fa-pencil"></i>&nbsp; Bearbeiten</a>
          </li>
        </ul>
      </li>
    );
  }

  getMenu() {
    const {incidentId} = this.props;
    return (
      <li className="dropdown">
        <a href="/incident" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-lg fa-ambulance"></i>&nbsp; Ereignis<span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu">
          <li>
            <a href="/incidents">
              <i className="fa fa-th-list"></i>&nbsp; Alle Ereignisse</a>
          </li>
          <li>
            <a href="/incidents/add">
              <i className="fa fa-plus-circle"></i>&nbsp; Erstellen</a>
          </li>
        </ul>
      </li>
    );
  }

  render() {
    const {incidentId} = this.props;
    if (!incidentId) {
      return this.getMenu();
    }
    return this.getMenuForIncident();
  }
}
