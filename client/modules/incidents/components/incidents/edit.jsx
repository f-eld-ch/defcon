import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="hidden-print">
        <h2>Neues Ereignis</h2>
        <div className="incident-editor">
          <form className="form-horizontal add-incident-entry">
            <div className="form-group">
              <label htmlFor="receiver" className="col-md-1 control-label">Name</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="name" value={this.props.incident.name} placeholder="Ereignisname"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="sender" className="col-md-1 control-label">Ort</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="location" value={this.props.incident.location} placeholder="Standort"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="text" className="col-md-1 control-label">Eröffnet</label>
              <div className="col-md-11">
                <input className="form-control" type="text" ref="createdAt" defaultValue={this.props.incident.date} placeholder=""/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-1 col-md-11">
                <button type="submit" className="btn btn-primary" onClick={this.props.submit}>
                  <i className="fa fa-lg fa-floppy-o"></i>&nbsp; Speichern</button>
              </div>
              <div className="col-md-offset-1 col-md-11"></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
