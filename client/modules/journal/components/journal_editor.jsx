import React from 'react';
import moment from 'moment';
import Error from '/client/modules/core/components/error.jsx';

export default class extends React.Component {

  constructor(props) {
    super(props);
    const {message} = props;

    if (message) {
      this.state = {
        id: message._id,
        sender: message.sender,
        receiver: message.receiver,
        text: message.text,
        createdAt: this.getDate(message.createdAt)
      };
    } else {
      this.state = {
        id: '',
        sender: '',
        receiver: '',
        text: '',
        createdAt: ''
      };
    }
  }
  renderTitle() {
    const {message} = this.props;
    if (message) {
      return (
        <h2>Journal-Eintrag bearbeiten</h2>
      );
    }
    return (
      <h2>Journal-Eintrag erstellen</h2>
    );
  }

  render() {
    const {error, clearErrors} = this.props;
    return (
      <div className="journal hidden-print">
        <Error error={error} clearErrors={clearErrors}/> {this.renderTitle()}
        <div className="journal-editor">
          <form className="form-horizontal add-journal-entry">
            <div className="form-group">
              <label htmlFor="receiver" className="col-md-1 control-label">Emfänger</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="receiver" value={this.state.receiver} onChange={this.handleReceiverChange.bind(this)} placeholder="Empfänger" autoFocus={true}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="receiver" className="col-md-1 control-label">Sender</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="sender" value={this.state.sender} onChange={this.handleSenderChange.bind(this)} placeholder="Sender"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="sender" className="col-md-1 control-label">Nachricht</label>
              <div className="col-md-11">
                <textarea className="form-control" name="text" rows="3" ref="text" value={this.state.text} onChange={this.handleTextChange.bind(this)} placeholder="Nachricht"></textarea>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="text" className="col-md-1 control-label">Datum</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="createdAt" value={this.state.createdAt} onChange={this.handleCreatedAtChange.bind(this)} placeholder={this.getDate(new Date)}/>
              </div>
            </div>
            {this.renderButtons()}
          </form>
        </div>
      </div>
    );
  }

  renderButtons() {
    const {message,incidentId} = this.props;
    if (!message) {
      return (
        <div className="form-group">
          <div className="col-xs-offset-1 col-xs-11">
            <button type="submit" className="btn btn-primary" onClick={this.saveMessage.bind(this)}>
              <i className="fa fa-floppy-o"></i>&nbsp; Speichern</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-xs-offset-1 col-xs-11">
            <button type="submit" className="btn btn-primary" onClick={this.saveMessage.bind(this)}>
              <i className="fa fa-floppy-o"></i>&nbsp; Speichern</button>
            <a href={`/incidents/${incidentId}/journal/write`} className="btn btn-info" role="button"><i className="fa fa-times"></i>&nbsp; Abbrechen</a>
            <button type="button" className="btn btn-danger" onClick={this.deleteMessage.bind(this)}>
              <i className="fa fa-trash-o"></i>&nbsp; Löschen</button>
          </div>
        </div>
      );
    }
  }

  getDate(date) {
    if (!date) {
      return;
    }
    return moment(date).format('DD.MM.YYYY HH:mm:ss');
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleSenderChange(event) {
    this.setState({sender: event.target.value});
  }
  handleReceiverChange(event) {
    this.setState({receiver: event.target.value});
  }
  handleCreatedAtChange(event) {
    this.setState({createdAt: event.target.value});
  }

  deleteMessage(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const {deleteMessage, message} = this.props;
    console.log('deleting message', message._id);
    deleteMessage(message);
  }

  saveMessage(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const {create, update, message, incidentId} = this.props;
    const {sender, receiver, text, createdAt} = this.refs;

    let createDate = null;
    if (createdAt.value) {
      createDate = moment(createdAt.value, 'DD.MM.YYYY HH:mm:ss').toDate();
    }

    // if no message is given, we are creating a message
    if (!message) {
      create(sender.value, receiver.value, text.value, createDate, incidentId);
      // clear the state and reset focus
      this.setState({id: ''});
      this.setState({sender: ''});
      this.setState({receiver: ''});
      this.setState({text: ''});
      this.setState({createdAt: ''});
      this.refs.receiver.focus();

    } else {
      update(message._id, sender.value, receiver.value, text.value, createDate, message.incident);
    }
  }
}
