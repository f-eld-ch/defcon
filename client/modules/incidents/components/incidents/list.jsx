import React from 'react';
import moment from 'moment';
import Error  from '/client/modules/core/components/error.jsx';


export default class extends React.Component {
  render() {
      return (
          <div>
              <Error message={this.props.error} clearErrors={this.props.clearErrors} />
              {this.renderTitle()}
              {this.renderHideBox()}
              {this.renderList()}
          </div>
      );
  }

  renderTitle(){
      const {openIncidents} = this.props
      if (openIncidents === 0){
          return (
              <h3>Kein offenes Ereignis</h3>
          );
      }
      if (openIncidents === 1){
          return (
              <h3>
                  <span className="label label-default">
                      {openIncidents}
                  </span> offenes Ereignis
              </h3>
          );
      }
      return (
          <h3>
              <span className="label label-default">
                  {openIncidents}
              </span> offene Ereignisse
          </h3>
      );
  }

  renderHideBox(){
      const {showCompleted} = this.props;
      return (
          <div className="checkbox">
              <label className="hide-completed">
                  <input
                      type="checkbox"
                      readOnly={true}
                      checked={!showCompleted}
                      onClick={this.toggleShowCompleted.bind(this)} />
                  Geschlossene Ereignisse ausblenden
              </label>
          </div>
      );
  }

  renderList() {
    const {incidents} = this.props;
    return (
      <div className="container-fluid">
          <div className="row incident-list hidden-xs">
              <div className="col-sm-4 col-xs-6"><b>Ereignis</b></div>
              <div className="col-sm-2 col-xs-6"><b>Ort</b></div>
              <div className="col-sm-2 col-xs-4"><b>Eröffnet</b></div>
              <div className="col-sm-2 col-xs-4"><b>Geschlossen</b></div>
              <div className="col-sm-2 col-xs-4"><b>Optionen</b></div>
          </div>
          {incidents.map(incident => (
              <div className="row incident-entry" id={incident.closedAt ? 'incident-entry-closed' : '' } key={incident._id}>
                  <div className="col-xs-6 visible-xs"><b>Name:</b></div>
                  <div className="col-sm-4 col-xs-6">{incident.name}</div>
                  <div className="col-xs-6 visible-xs"><b>Ort:</b></div>
                  <div className="col-sm-2 col-xs-6">{incident.location}</div>
                  <div className="col-xs-6 visible-xs"><b>Eröffnet:</b></div>
                  <div className="col-sm-2 col-xs-6">{this.getDate(incident.createdAt)}</div>
                  <div className="col-xs-6 visible-xs"><b>Geschlossen:</b></div>
                  <div className="col-sm-2 col-xs-6">{this.getDate(incident.closedAt)}</div>
                  <div className="clearfix visible-xs-block"></div>
                  <div className="col-sm-2 col-xs-12">
                      <div className="btn-group">
                            <a role="button" className="btn btn-primary" href={`/incidents/${incident._id}/journal/write`}><i className="fa fa-bars"></i>&nbsp; Journal</a>
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                              <span className="caret"></span>
                              <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a href={`/incidents/${incident._id}/edit`}><i className="fa fa-pencil"></i>&nbsp; Bearbeiten</a></li>
                              <li role="separator" className="divider"></li>
                              <li>{this.renderCloseButton(incident)}</li>
                            </ul>
                      </div>
                 </div>
              </div>
          ))}
      < /div>
    )
  }

  renderCloseButton(incident) {
      if (incident.closedAt) {
        return (
          <a href="#" onClick={this.closeIncident.bind(this,incident._id)}><i className="fa fa-external-link"></i>&nbsp; Öffnen</a>
        );
      }
      else {
          return (
              <a href="#" onClick={this.closeIncident.bind(this,incident._id)}><i className="fa fa-times"></i>&nbsp; Beenden</a>
          )
      }
  }

  getDate(date) {
      if (! date ) {
          return
      }
      return moment(date).format('DD.MM.YYYY HH:mm');
  }

  closeIncident(_id, event) {
      // Becaus the test cannot get event argument
      // so call preventDefault() on undefined cause an error
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      const {closeIncident} = this.props;
      closeIncident(_id);
  }

  toggleShowCompleted(event) {
      // Becaus the test cannot get event argument
      // so call preventDefault() on undefined cause an error
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      const {toggleShowCompleted} = this.props;
      toggleShowCompleted();
  }
}
