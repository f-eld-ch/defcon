IncidentEditor = React.createClass({
    mixins: [ ReactMeteorData, SpinnerMixin],
    getMeteorData() {
        let allIncidents =  Meteor.subscribe('allIncidents');
        console.log("Editor get data for id " + this.props.id );
        return {
            subscriptions: [allIncidents],
            incident: Incidents.findOne({_id: this.props.id}),
        };
    },
    propTypes: {
        id: React.PropTypes.string,
    },
    toggleClosed() {
        if(this.data.incident){
            Meteor.call("toggleClosedIncident", this.data.incident._id);
        }
    },
    saveIncident() {
        if( this.data.incident ){
            Meteor.call("updateIncident", this.data.incident);
        }
        else {
            Meteor.call("addIncident", this.data.incident);
        }
    },
    render() {
        console.log(this.data.incident );

        return (
            <p>EDITOR for {this.data.incident.location}</p>
        );
    }
});
