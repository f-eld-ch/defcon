// Task component - represents a single todo item
IncidentEntry = React.createClass({
    propTypes: {
        incident: React.PropTypes.object.isRequired,
    },
    deleteIncident() {
        Meteor.call("removeIncident", this.props.incident._id);
    },
    toggleClosed() {
        Meteor.call("toggleClosedIncident", this.props.incident._id);
    },
    getDate(date) {
        if (!date) {
            return (
                <button type="close-incident" className="btn btn-warning btn-sm" onClick={this.toggleClosed}><i className="fa fa-times"> Beenden</i></button>
            );
        }
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
    render() {
        // Give incidents a different className when they are closed,
        // so that we can style them nicely in CSS
        // Add "closed"
        const incidentClassName = (this.props.incident.closedAt ? "closed" : "");

        return (
            <tr className={incidentClassName}>
                <td>{this.props.incident.name}</td>
                <td>{this.props.incident.location}</td>
                <td className="no-print">
                    <a href={FlowHelpers.pathFor('journal', { incident: this.props.incident._id } )} type="button" className="btn btn-primary btn-sm">
                        <i className="fa fa-bars"> Journal</i>
                    </a>
                </td>
                <td>{this.getDate(this.props.incident.createdAt)}</td>
                <td>{this.getDate(this.props.incident.closedAt)}</td>
                <td>{this.props.incident.text}</td>
                <td className="no-print">
                    <a href={FlowHelpers.pathFor('incidentEditor', { incident: this.props.incident._id } )} type="button" className="btn btn-primary btn-sm">
                        <i className="fa fa-pencil"></i>
                    </a>
                </td>
            </tr>
        );
    }
});
