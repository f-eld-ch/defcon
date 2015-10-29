IncidentsTable = React.createClass({
    mixins: [ReactMeteorData, SpinnerMixin],
    getMeteorData() {
        let incidentSubscription =  Meteor.subscribe('allIncidents');
        let query = {};
        if (this.state.hideClosed) {
            // If hide closed is checked, filter incidents
            query = {closedAt: null};
        }
        return {
            subscriptions: [incidentSubscription],
            incidents: Incidents.find(query, {sort: {createdAt: -1}}).fetch(),
            openCount: Incidents.find({closedAt: null}).count(),
        };
    },
    getInitialState() {
        return {
            hideClosed: false,
        };
    },
    toggleHideCompleted() {
        this.setState({
            hideClosed: ! this.state.hideClosed
        });
    },
    renderIncidents() {
        return this.data.incidents.map((incident) => {
            return <IncidentEntry key={incident._id} incident={incident} />;
        });
    },
    render() {
        if (!this.data.incidents){
            return (
                <h2>Keine Ereignisse</h2>
            );
        }
        return (
            <div className="table-responsive">
                <h2><span className="badge">{this.data.openCount}</span> Offene Ereignisse</h2>
                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly={true}
                        checked={this.state.hideClosed}
                        onClick={this.toggleHideCompleted} />
                    Geschlossene Ereignisse ausblenden
                </label>
                <table className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Ereignis</th>
                            <th>Ort</th>
                            <th>Journal</th>
                            <th>Eröffnet</th>
                            <th>Geschlossen</th>
                            <th className="no-print"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.renderIncidents()}
                    </tbody>
                </table>
            </div>
        );
    }
});
