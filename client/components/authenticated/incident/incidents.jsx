IncidentsManager = React.createClass({
    mixins: [ ReactMeteorData, SpinnerMixin],
    getMeteorData() {
        let allIncidents =  Meteor.subscribe('allIncidents');
        console.log("getting incident data");
        return {
            subscriptions: [allIncidents],
            incidents: Incidents.find().fetch()
        };
    },
    render() {
        console.log("loaded incident data");
        return (
            //<IncidentEditor />
            <IncidentsTable incidents={this.data.incidents} />
        );
    }
});
