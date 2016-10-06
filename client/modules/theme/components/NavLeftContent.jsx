import React from 'react';
import DropDown from './NavElemDropDown.jsx';
import IncidentsNav from '/client/modules/incidents/components/navigation/incidents.jsx';
import JournalNav from '/client/modules/journal/components/navigation/journal.jsx';

export default class extends React.Component {
    render() {
        const {incidentId} = this.props;
        return (
          <ul className="nav navbar-nav">
            <IncidentsNav incidentId={incidentId}/>
            <JournalNav incidentId={incidentId}/>
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
};
