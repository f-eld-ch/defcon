IncidentsManager = React.createClass({
    mixins: [ ReactMeteorData, SpinnerMixin],
    getMeteorData() {
        let allIncidents =  Meteor.subscribe('allIncidents');
        return {
            subscriptions: [allIncidents],
            incidents: Incidents.find().fetch()
        };
    },
    render() {
        return (
            <div>
                <IncidentEditor />
                <IncidentsTable incidents={this.data.incidents} />
            </div>
        );
    }
});
