IncidentEditor = React.createClass({
    mixins: [ReactMeteorData, SpinnerMixin],

    propTypes: {
        id: React.PropTypes.string,
    },
    getMeteorData() {
        if (this.props.id) {
            let allIncidents = Meteor.subscribe('allIncidents');
            return {
                subscriptions: [allIncidents],
                incident: Incidents.findOne({
                    _id: this.props.id
                })
            };
        }
        else {
            console.log("no data required");
            return {
                subscriptions: [],
                incident: null,
            };
        }
    },
    toggleClosed() {
        if (this.props.id) {
            Meteor.call("toggleClosedIncident", this.data.incident._id);
        }
    },
    saveIncident() {
        if (this.props.id) {
            Meteor.call("updateIncident", this.data.incident);
        } else {
            Meteor.call("addIncident", this.data.incident);
        }
    },
    render() {
        if (this.props.id){
            return (
                <div className="incident-editor">
                    <form className="form-horizontal update-incident-entry">
                        <div className="form-group">
                            <label htmlFor="receiver" className="col-sm-1 control-label">Name</label>
                            <div className="col-sm-11">
                                <input className="form-control" type="text" name="name" value= placeholder="{this.data.incident.name}"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sender" className="col-sm-1 control-label">Ort</label>
                            <div className="col-sm-11">
                                <input className="form-control" type="text" name="location" value="" placeholder="{this.data.incident.location}"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="text" className="col-sm-1 control-label">Eröffnet</label>
                            <div className="col-sm-11">
                                <input className="form-control" type="text" name="createdAt" value="" placeholder={this.getDate(this.data.incident.createdAt)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-1 col-sm-11">
                                <button type="submit" className="btn btn-primary">Ändern</button>
                                <button type="close-incident" className="btn btn-warning close-incident">Beenden</button>
                            </div>
                            <div className="col-sm-offset-1 col-sm-11"></div>
                        </div>
                    </form>
                </div>
            );
        }
        else {
            return(
                <h3>New Incident</h3>
            )
        }


    }
});
