import React from 'react';

export default class extends React.Component {

  getMenuForIncident() {
    const {incidentId} = this.props;
    return (
      <li className="dropdown">
        <a href={`/incidents/${incidentId}/journal`} className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-lg fa-bars"></i>&nbsp; Journal
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu">
          <li>
            <a href={`/incidents/${incidentId}/journal`}>
              <i className="fa fa-th-list"></i>&nbsp; Feed</a>
          </li>
          <li>
            <a href={`/incidents/${incidentId}/journal/write`}>
              <i className="fa fa-plus-circle"></i>&nbsp; Schreiben</a>
          </li>
        </ul>
      </li>
    );
  }

  getMenu() {
    const {incidentId} = this.props;
    return (
      <li className="disabled">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-lg fa-bars"></i>&nbsp; Journal
                <span className="caret"></span>
          </a>
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
