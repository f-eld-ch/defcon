IncidentsTable = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            hideClosed: false
        };
    },
    getMeteorData() {
        let query = {};

        if (this.state.hideCompleted) {
            // If hide closed is checked, filter incidents
            query = {closedAt: {$eq: null}};
        }

        return {
            incidents: Incidents.find(query, {sort: {createdAt: -1}}).fetch(),
            openCount: Incidents.find({closedAt: null}).count(),
        };
    },
    toggleHideCompleted() {
        this.setState({
            hideClosed: ! this.state.hideCompleted
        });
    },
    renderIncidents() {
        return this.data.incidents.map((incident) => {
            return <Incident key={incident._id} incident={incident} />;
        });
    },
    render() {
        return (
            <div className="table-responsive">
                <h2><span className="badge">{this.data.openCount}</span> Offene Ereignisse</h2>
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
