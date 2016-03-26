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
                    Bert.alert("Update des Ereignisses ist gescheitert: " + err.reason, 'danger');
                    return;
                }
                FlowRouter.go('incident');
            });
        } else {
            Meteor.call("addIncident", incident, function(err) {
                    if (err) {
                        Bert.alert("Erstellen des Ereignis ist gescheitert: " + err.reason, 'danger');
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
                <button type="close-incident" className="btn btn-warning close-incident" onClick={this.toggleClosed}><i className="fa fa-lg fa-times"> </i>&nbsp; Beenden</button>
            );
        } else {
            return (
                <button type="close-incident" className="btn btn-info close-incident" onClick={this.toggleClosed}><i className="fa fa-lg fa-external-link"> </i>&nbsp; Neu Öffnen</button>
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
                <div className="hidden-print">
                    <h2>Ereignis bearbeiten</h2>
                    <div className="incident-editor">
                        <form className="form-horizontal update-incident-entry">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-1 control-label">Name</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="name" valueLink={this.linkState('name')} placeholder="Ereignisname"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location" className="col-md-1 control-label">Ort</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="location"  valueLink={this.linkState('location')} placeholder="Standort"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="createdAt" className="col-md-1 control-label">Eröffnet</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="createdAt" valueLink={this.linkState('createdAt')} placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-2">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-lg fa-floppy-o"> </i>&nbsp; Speichern</button>
                                </div>
                                <div className="col-md-2">
                                    {this.renderCloseButton()}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="hidden-print">
                    <h2>Neues Ereignis</h2>
                    <div className="incident-editor">
                        <form className="form-horizontal add-incident-entry">
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-md-1 control-label">Name</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="name" valueLink={this.linkState('name')} placeholder="Ereignisname"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sender" className="col-md-1 control-label">Ort</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="location"  valueLink={this.linkState('location')} placeholder="Standort"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text" className="col-md-1 control-label">Eröffnet</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="createdAt" defaultValue={this.getDate(new Date())} placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-11">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-lg fa-floppy-o"> </i>&nbsp; Speichern</button>
                                </div>
                                <div className="col-md-offset-1 col-md-11"></div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
});
