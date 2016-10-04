import React from 'react';
import DropDown from './NavElemDropDown.jsx';
import Incidents from '/client/modules/incidents/containers/navigation/incidents.jsx';

export default() => {
  return (
    <ul className="nav navbar-nav">
      <Incidents />
      <li className="disabled">
        <a href="/journals">
          <i className="fa fa-lg fa-bars"></i>&nbsp; Journal
        </a>
      </li>
      <li className="disabled">
        <a href="/tasks">
          <i className="fa fa-lg fa-check-square-o"></i>&nbsp; Pendenzen
        </a>
      </li>
      <li className="disabled">
        <a href="/items">
          <i className="fa fa-lg fa-male"></i>&nbsp; Mitteltablle
        </a>
      </li>
      <li className="disabled">
        <a href="/items">
          <i className="fa fa-lg fa-exchange"></i>&nbsp; Verbindungen
        </a>
      </li>
    </ul>
  );
};
