import React from 'react';
import moment from 'moment';
import Error  from '/client/modules/core/components/error.jsx';


export default class extends React.Component {

  constructor(props) {
    super(props);
    const {incident} = props;

    this.state = {
      id: incident._id,
      name: incident.name,
      location: incident.location,
      createdAt: this.getDate(incident.createdAt)
    };
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleTimeChange(event) {
    this.setState({createdAt: event.target.value});
  }

  render() {
    return (
      <div className="hidden-print">
        <Error message={this.props.error} clearErrors={this.props.clearErrors} />
        <h2>Ereignis bearbeiten</h2>
        <div className="incident-editor">
          <form className="form-horizontal add-incident-entry" onSubmit={this.saveIncident.bind(this)}>
            <div className="form-group">
              <label htmlFor="name" className="col-md-1 control-label">Name</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="name" onChange={this.handleNameChange.bind(this)} value={this.state.name} placeholder="Ereignisname"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location" className="col-md-1 control-label">Ort</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="location" onChange={this.handleLocationChange.bind(this)} value={this.state.location} placeholder="Standort"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="createdAt" className="col-md-1 control-label">Eröffnet</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="createdAt" onChange={this.handleTimeChange.bind(this)} value={this.state.createdAt} placeholder=""/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-1 col-md-1">
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-lg fa-floppy-o"></i>&nbsp; Speichern</button>
              </div>
              <div className="col-md-1">
                {this.renderCloseButton()}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderCloseButton() {
    const {incident} = this.props;
    if (!incident.closedAt) {
      return (
        <button type="close-incident" className="btn btn-warning close-incident" onClick={this.toggleClosed.bind(this)}>
          <i className="fa fa-lg fa-times"></i>&nbsp; Beenden</button>
      );
    } else {
      return (
        <button type="close-incident" className="btn btn-info close-incident" onClick={this.toggleClosed.bind(this)}>
          <i className="fa fa-lg fa-external-link"></i>&nbsp; Neu Öffnen</button>
      );
    }
  }

  getDate(date) {
    if (!date) {
      return
    }
    return moment(date).format('DD.MM.YYYY HH:mm');
  }

  saveIncident(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const {update, incident} = this.props;
    const {name, location, createdAt} = this.refs;
    update(incident._id, name.value, location.value, moment(createdAt.value, 'DD.MM.YYYY HH:mm').toDate());
  }

  toggleClosed(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const {closeIncident, incident} = this.props;
    closeIncident(incident._id);
  }
}
