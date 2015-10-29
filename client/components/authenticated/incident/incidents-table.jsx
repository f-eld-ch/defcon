IncidentsTable = React.createClass({
    //mixins: [ReactMeteorData, SpinnerMixin],
    mixins: [ReactMeteorData],
    getMeteorData() {
        var table = this;
        let incidentSubscription =  Meteor.subscribe('allIncidents', {
            onReady: function() {
                console.log("data ready");
                table.setState({
                    hideClosed: true,
                    dataReady: true,
                });
            }
        });

        let query = {};
        if (this.state.hideClosed) {
            // If hide closed is checked, filter incidents
            query = {closedAt: null};
        }
        return {
            isDataReady: incidentSubscription.ready(),
            incidents: Incidents.find(query, {sort: {createdAt: -1}}).fetch(),
            openCount: Incidents.find({closedAt: null}).count(),
        };
    },
    getInitialState() {
        return {
            hideClosed: false,
            dataReady: false,
        };
    },
    toggleHideCompleted() {
        this.setState({
            hideClosed: ! this.state.hideClosed,
            dataReady: true,
        });
    },
    renderIncidents() {
        return this.data.incidents.map((incident) => {
            return <IncidentEntry key={incident._id} incident={incident} />;
        });
    },
    render() {
        if (!this.data.isDataReady){
            console.log('Data is not ready');
            return (<SpinnerView />);
        }
        else{
            console.log('Data is ready');
        }
        if (_.isEmpty(this.data.incidents)){
            return (
                <div className="table-responsive">
                    <h2> Keine Ereignisse</h2>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly={true}
                            checked={this.state.hideClosed}
                            onClick={this.toggleHideCompleted} />
                        Geschlossene Ereignisse ausblenden
                    </label>
                </div>

            );
        }
        return (
            <div className="table-responsive">
                <h2>
                    <span className="badge">
                        {this.data.openCount}
                    </span> Offene Ereignisse
                </h2>
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
});
