import React from 'react';
import moment from 'moment';
import Error  from '/client/modules/core/components/error.jsx';

class NewIncident extends React.Component {
  render() {
    return (
        <div>
            <Error message={this.props.error} clearErrors={this.props.clearErrors} />
            <h2>Neues Ereignis</h2>
            <div className="incident-editor">
              <form className="form-horizontal add-incident-entry" onSubmit={this.createIncident.bind(this)}>
                <div className="form-group">
                  <label htmlFor="receiver" className="col-md-1 control-label">Name</label>
                  <div className="col-md-11">
                    <input className="form-control" type="text" ref="name" placeholder="Ereignisname"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="sender" className="col-md-1 control-label">Ort</label>
                  <div className="col-md-11">
                    <input className="form-control" type="text" ref="location" placeholder="Standort"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="text" className="col-md-1 control-label">Eröffnet</label>
                  <div className="col-md-11">
                    <input className="form-control" type="text" ref="createdAt" placeholder={moment().format('DD.MM.YYYY HH:mm')}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-offset-1 col-md-11">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa fa-lg fa-floppy-o"></i>&nbsp; Speichern</button>
                  </div>
                  <div className="col-md-offset-1 col-md-11"></div>
                </div>
              </form>
            </div>
        </div>
    );
  }

  createIncident(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {create} = this.props;
    const {name, location, createdAt} = this.refs;

    create(name.value, location.value, createdAt.value);
  }
}

export default NewIncident;
