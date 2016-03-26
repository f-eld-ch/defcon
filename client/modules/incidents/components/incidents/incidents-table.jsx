import React from 'react';
import IncidentsTableEntry from './incident-table-entry.jsx';

export default class extends React.Component {

    renderTitle(){
        if (this.data.openCount === 0){
            return (
                <h3>Kein offenes Ereignis</h3>
            );
        }
        if (this.data.openCount === 1){
            return (
                <h3>
                    <span className="label label-default">
                        {this.data.openCount}
                    </span> offenes Ereignis
                </h3>
            );
        }
        return (
            <h3>
                <span className="label label-default">
                    {this.data.openCount}
                </span> offene Ereignisse
            </h3>
        );
    }

    renderHideBox(){
        return (
            <div className="checkbox">
                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly={true}
                        checked={this.props.hideClosed}
                        onClick={this.toggleHideCompleted} />
                    Geschlossene Ereignisse ausblenden
                </label>
            </div>
        );
    }

    renderTable() {
        if (_.isEmpty(this.data.incidents)){
            return;
        }
        return (
            <div className="table-responsive">
                <table className="table table-hover incident-table">
                    <thead>
                        <tr>
                            <th>Ereignis</th>
                            <th>Ort</th>
                            <th>Journal</th>
                            <th>Eröffnet</th>
                            <th>Geschlossen</th>
                            <th className="no-print">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderIncidents()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderIncidents() {
        return this.data.incidents.map((incident) => {
            return <IncidentTableEntry key={incident._id} incident={incident} />;
        });
    }


    render() {
        return (
            <div>
                {this.renderTitle()}
                {this.renderHideBox()}
                {this.renderTable()}
            </div>
        );
    }
};
