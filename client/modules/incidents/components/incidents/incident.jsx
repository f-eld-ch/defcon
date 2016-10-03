import React from 'react';
import moment from 'moment';

const Incident = ({incident}) => (
  <div className="incident">
    <h2>{incident.name}</h2>
    <form className="form-horizontal">
      <div className="form-group">
        <label htmlFor="location" className="col-md-1 control-label">Ort</label>
        <div className="col-md-11">
          <input className="form-control" type="text" value={incident.location} readOnly/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="createdAt" className="col-md-1 control-label">Eröffnet</label>
        <div className="col-md-11">
          <input className="form-control" type="text" value={moment(incident.createdAt).format('LLLL')} readOnly/>
        </div>
      </div>
    </form>
  </div>
);

export default Incident;
