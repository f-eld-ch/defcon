import React from 'react';
import moment from 'moment';
import Error  from '/client/modules/core/components/error.jsx';

export default class extends React.Component {
  render() {
    return (
        <div className="journal">
          <Error message={this.props.error} clearErrors={this.props.clearErrors} />

          <h2>Journal</h2>
          {this.renderHideBox()}
          {this.renderJournalEntries()}
          {this.renderJournalPrint()}
        </div>
    );
  }

  renderJournalEntries() {
    const {messages} = this.props;
    return (
      <div className="journal-list hidden-print">
        {messages.map(message => (this.renderJournalEntry(message)))}
      </div>
    );
  }

  renderJournalPrint() {
    const {messages} = this.props;

    let time = moment(new Date).format('DD.MM.YYYY HH:mm:ss');
    return (
        <div className="visible-print">
            <h4>Stand: {time}</h4>
            <div className="table-responsive journal-print">
                <table className="table table-hover table-condensed journal-table">
                    <thead>
                        <tr>
                            <th>Zeit</th>
                            <th>Sender</th>
                            <th>Emfänger</th>
                            <th>Nachricht</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(message => (
                            <tr key={message._id}>
                                <td>{this.getDate(message.createdAt)}</td>
                                <td>{message.sender}</td>
                                <td>{message.receiver}</td>
                                <td><span className="pre">{message.text}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }

  renderJournalEntry(message) {
    return (
      <div className="row journal-entry no-print" id={message.priority ? 'journal-message-prio' : ''} key={message._id} >
        <div className="col-xs-6 col-sm-2 col-md-1"><b>Sender:</b></div>
        <div className="col-xs-6 col-sm-10 col-md-11">{message.sender}</div>
        <div className="clearfix" />

        <div className="col-xs-6 col-sm-2 col-md-1"><b>Empfänger:</b></div>
        <div className="col-xs-6 col-sm-10 col-md-11">{message.receiver}</div>
        <div className="clearfix" />

        <div className="col-xs-6 col-sm-2 col-md-1"><b>Zeit:</b></div>
        <div className="col-xs-6 col-sm-10 col-md-11">{this.getDate(message.createdAt)}</div>
        <div className="clearfix" />

        <div className="col-xs-12"><pre>{message.text}</pre></div>
        <div className="clearfix" />

        <div className="col-xs-12">{this.renderControl(message)}</div>
      </div>
    );
  }

  renderHideBox() {
    const {showAll} = this.props;
    return (
      <div className="checkbox hidden-print">
        <label className="show-all">
          <input type="checkbox" checked={!showAll} onClick={this.toggleShowAll.bind(this)}/>
          Zeige nur wichtige Nachrichten
        </label>
      </div>
    );
  }

  renderControl(message) {
    const {incidentId,showControls} = this.props;
    if (!showControls) {
        return null;
    }

    return (
        <div className="btn-group btn-group-sm">
          <button type="button" className="btn btn-primary" onClick={this.togglePriority.bind(this, message._id)}>
            <i className="fa fa-exclamation"></i>&nbsp; Priorität ändern</button>
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a href={`/incidents/${incidentId}/journal/${message._id}/edit`}><i className="fa fa-pencil"></i>&nbsp; Bearbeiten</a>
            </li>
            <li>
                <a onClick={this.deleteMessage.bind(this, message._id)}><i className="fa fa-trash"></i>&nbsp; Löschen</a>
            </li>
            <li role="separator" className="divider"></li>
            <li>
              <a href={`/incidents/${incidentId}/task/create?message=${message._id}`}>
                <i className="fa fa-plus-square"></i>&nbsp; Pendenz/Antrag erstellen</a>
            </li>
          </ul>
        </div>
    )
  }

  getDate(date) {
    if (!date) {
      return
    }
    return moment(date).format('DD.MM.YYYY HH:mm:ss');
  }

  toggleShowAll(event) {
    // Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {toggleShowAll} = this.props;
    toggleShowAll();
  }

  togglePriority(messageId, event) {
    // Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const {togglePriority} = this.props;
    togglePriority(messageId);
  }

  deleteMessage(messageId, event) {
    // Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const {deleteMessage} = this.props;
    deleteMessage(messageId);
  }

}
