JournalEdit = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        let journalSubscription = Meteor.subscribe('journalItem',this.props.message);
        return {
            subscriptions: [journalSubscription],
            isDataReady: journalSubscription.ready(),
            message: Journal.findOne({
                _id: this.props.message
            })
        };
    },
    propTypes: {
        message: React.PropTypes.string,
        incident: React.PropTypes.string,
    },
    render: function() {
        return (
            <JournalEditor  message={this.data.message} incident={this.props.incident} />
        );
    }
});

JournalEditor = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
        message: React.PropTypes.object,
        incident: React.PropTypes.string,
    },
    getInitialState: function() {
        if (this.props.message){
            return {
                id: this.props.message._id,
                sender: this.props.message.sender,
                receiver: this.props.message.receiver,
                text: this.props.message.text,
                createdAt: this.getDate(this.props.message.createdAt),
            };
        }
        return {
            id: '',
            sender: '',
            receiver: '',
            text: '',
            createdAt: null,
        };
    },
    saveMessage: function(message) {
        let incident =  this.props.incident;
        let editor = this;

        // if we got props message we need to update the message, otherwise its a new one
        if (this.props.message) {
            Meteor.call("updateJournalMessage", message, function(err) {
                if (err) {
                    Bert.alert("Fehler beim Speichern: " + err.reason, 'danger');
                    return;
                }
                let path = FlowRouter.path('journal', {incident: incident});
                FlowRouter.go(path);
            });
        } else {
            Meteor.call("addJournalMessage", message, incident, function(err) {
                if (err) {
                    Bert.alert("Fehler beim Hinzufügen: " + err.reason, 'danger');
                    return;
                }
                // Reset the state
                editor.setState({errors: {},
                    id: '',
                    sender: '',
                    receiver: '',
                    text: '',
                    createdAt: null,
                });
            });
        }
    },
    getDate: function(date) {
        if (!date) {
            return;
        }
        return moment(date).format('DD.MM.YYYY HH:mm:ss');
    },
    handleDelete: function(event) {
        event.preventDefault();
        if (this.props.message) {
            Meteor.call("deleteJournalMessage", this.props.message._id);
        }
        FlowRouter.go(FlowRouter.path('journal', {incident: this.props.incident}));
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.message){
            this.setState({errors: {},
                id: nextProps.message._id,
                sender: nextProps.message.sender,
                receiver: nextProps.message.receiver,
                text: nextProps.message.text,
                createdAt: this.getDate(nextProps.message.createdAt),
            });
        }
        else {
            this.setState({errors: {},
                id: '',
                sender: '',
                receiver: '',
                text: '',
                createdAt: null,
            });
        }
    },
    handleSubmit: function(event) {
        event.preventDefault();
        let date = this.state.createdAt;
        if (date && !moment(date,'DD.MM.YYYY HH:mm:ss').isValid()){
            Bert.alert("Datum ist nicht gültig", 'danger');
            return;
        }
        let message = {
            _id: this.state.id,
            sender: this.state.sender,
            receiver: this.state.receiver,
            text: this.state.text,
            createdAt: date ? moment(date,'DD.MM.YYYY HH:mm:ss').toDate() : new Date(),
        };
        this.saveMessage(message);
        this.refs.receiver.getDOMNode().focus();
    },
    render: function() {
        if (this.props.message) {
            return (
                <div className="hidden-print">
                    <h2>Journal-Eintrag bearbeiten</h2>
                    <div className="incident-editor">
                        <form className="form-horizontal update-journal-entry">
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-md-1 control-label">Emfänger</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="receiver" valueLink={this.linkState('receiver')} placeholder="Empfänger" autofocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-md-1 control-label">Sender</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="sender" valueLink={this.linkState('sender')} placeholder="Absender"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sender" className="col-md-1 control-label">Nachricht</label>
                                <div className="col-md-11">
                                    <textarea className="form-control" name="text" ref="text" rows="3" valueLink={this.linkState('text')} placeholder="Nachricht"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text" className="col-md-1 control-label">Datum</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="createdAt" valueLink={this.linkState('createdAt')} placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-2">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-floppy-o"> Speichern</i>  </button>
                                </div>
                                <div className="col-md-2">
                                    <button type="close-incident" className="btn btn-danger delete-message" onClick={this.handleDelete}><i className="fa fa-trash-o"> Löschen</i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="hidden-print">
                    <h2>Neuer Journal-Eintrag</h2>
                    <div className="journal-editor">
                        <form className="form-horizontal add-journal-entry">
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-md-1 control-label">Emfänger</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="receiver" valueLink={this.linkState('receiver')} placeholder="Empfänger" autofocus/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="receiver" className="col-md-1 control-label">Sender</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="sender" valueLink={this.linkState('sender')} placeholder="Sender"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sender" className="col-md-1 control-label">Nachricht</label>
                                <div className="col-md-11">
                                    <textarea className="form-control" name="text" rows="3" ref="text" valueLink={this.linkState('text')} placeholder="Nachricht"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text" className="col-md-1 control-label">Datum</label>
                                <div className="col-md-11">
                                    <input className="form-control" type="text" ref="createdAt" valueLink={this.linkState('createdAt')} placeholder={this.getDate(new Date)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-1 col-md-2">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-floppy-o"> Speichern</i>  </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
});
