IncidentEdit = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let incidentSubscription = Meteor.subscribe('incident',this.props.incident);
        return {
            subscriptions: [incidentSubscription],
            incident: Incidents.findOne({
                _id: this.props.incident
            })
        };
    },
    propTypes: {
        incident: React.PropTypes.string
    },
    render: function() {
        return (
            <IncidentEditor incident={this.data.incident}/>
        );
    }
});

IncidentEditor = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
        incident: React.PropTypes.object
    },
    getInitialState: function() {
        if (this.props.incident){
            return {
                id: this.props.incident._id,
                name: this.props.incident.name,
                location: this.props.incident.location,
                createdAt: this.getDate(this.props.incident.createdAt),
            };
        }
        return {
            id: '',
            name: '',
            location: '',
            createdAt: this.getDate(new Date),
        };
    },
    saveIncident: function(incident) {
        if (this.props.incident) {
            Meteor.call("updateIncident", this.props.incident._id, incident, function(err) {
                if (err) {
                    Bert.alert("Update Failed: " + err.reason);
                    return;
                }
                FlowRouter.go('incident');
            });
        } else {
            Meteor.call("addIncident", incident, function(err) {
                    if (err) {
                        Bert.alert("Adding new Incident failed: " + err.reason);
                        return;
                    }
                    FlowRouter.go('incident');
            });
        }
    },
    getDate: function(date) {
        if (!date) {
            return;
        }
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
    toggleClosed: function(event) {
        event.preventDefault();
        if (this.props.incident) {
            Meteor.call("toggleClosedIncident", this.props.incident._id);
        }
        FlowRouter.go('incident');
    },
    renderCloseButton: function() {
        if (!this.props.incident.closedAt) {
            return (
                <button type="close-incident" className="btn btn-warning close-incident" onClick={this.toggleClosed}>Beenden</button>
            );
        } else {
            return (
                <button type="close-incident" className="btn btn-info close-incident" onClick={this.toggleClosed}>Neu Öffnen</button>
            );
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.incident){
            this.setState({errors: {},
                id: nextProps.incident._id,
                name: nextProps.incident.name,
                location: nextProps.incident.location,
                createdAt: this.getDate(nextProps.incident.createdAt),
            });
        }
        else {
            this.setState({errors: {},
                id: '',
                name: '',
                location: '',
                createdAt: this.getDate(new Date),
            });
        }
    },
    handleSubmit: function(event) {
        event.preventDefault();
        let date = this.state.createdAt;
        if (!moment(date,'DD.MM.YYYY HH:mm').isValid()){
            console.log(date);
            Bert.alert("Datum ist nicht gültig", 'danger');
            return;
        }
        let incident = {
            name: this.state.name,
            location: this.state.location,
            createdAt: moment(date,'DD.MM.YYYY HH:mm').toDate(),
        };
        this.saveIncident(incident);
    },
    render: function() {
        if (this.props.incident) {
            return (
                <div>
                    <h2>Ereignis bearbeiten</h2>
                    <div className="incident-editor">
                        <form className="form-horizontal update-incident-entry">
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-sm-1 control-label">Name</label>
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" ref="name" valueLink={this.linkState('name')} placeholder="Ereignisname"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sender" className="col-sm-1 control-label">Ort</label>
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" ref="location"  valueLink={this.linkState('location')} placeholder="Standort"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text" className="col-sm-1 control-label">Eröffnet</label>
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" ref="createdAt" valueLink={this.linkState('createdAt')} placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-1 col-sm-2">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Speichern</button>
                                </div>
                                <div className="col-sm-2">
                                    {this.renderCloseButton()}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Neues Ereignis</h2>
                    <div className="incident-editor">
                        <form className="form-horizontal add-incident-entry">
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-sm-1 control-label">Name</label>
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" ref="name" valueLink={this.linkState('name')} placeholder="Ereignisname"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sender" className="col-sm-1 control-label">Ort</label>
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" ref="location"  valueLink={this.linkState('location')} placeholder="Standort"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text" className="col-sm-1 control-label">Eröffnet</label>
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" ref="createdAt" defaultValue={this.getDate(new Date())} placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-1 col-sm-11">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Speichern</button>
                                </div>
                                <div className="col-sm-offset-1 col-sm-11"></div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
});
