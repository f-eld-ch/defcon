import React from 'react';
import moment from 'moment';

export default class extends React.Component {
  render() {
      const {error} = this.props;

      return (
          <div>
              {error ? this.renderError(error) : null}
              {this.renderTitle()}
              {this.renderHideBox()}
              {this.renderTable()}
          </div>
      );
  }

  renderError(error) {
    return (
      <div className='alert alert-danger fade in error'>
        {error}
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

  renderTable() {
    const {incidents} = this.props;
    return (
      <div className = "table-responsive" > <table className="table table-hover incident-table">
          <thead>
            <tr>
              <th>Ereignis</th>
              <th>Ort</th>
              <th>Journal</th>
              <th>Eröffnet</th>
              <th>Geschlossen</th>
              <th className="no-print"></th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident._id} className={incident.closedAt
                ? "active"
                : ""}>
                <td>{incident.name}</td>
                <td>{incident.location}</td>
                <td className="no-print">
                  <a href={`/incidents/${incident._id}/journal`} type="button" className="btn btn-primary">
                    <i className="fa fa-lg fa-bars"></i>&nbsp; Journal
                  </a>
                </td>
                <td>{this.getDate(incident.createdAt)}</td>
                <td>{!incident.closedAt ?
                        <button type="close-incident" className="btn btn-warning" ref={incident._id} onClick={this.closeIncident.bind(this,incident._id)}><i className="fa fa-lg fa-times"></i>&nbsp; Beenden < /button> : this.getDate(incident.closedAt)}
                </td>
                <td>{incident.text}</td>
                <td className="no-print">
                  <a href={`/incidents/${incident._id}/edit`} type="button" className="btn btn-primary">
                    <i className="fa fa-lg fa-pencil"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      < /div>
    )
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
