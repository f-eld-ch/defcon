import React from 'react';

export default class extends React.Component {
    getDate(date) {
        return moment(date).format('DD.MM.YYYY HH:mm');
    }

    render() {
        // Give incidents a different className when they are closed,
        // so that we can style them nicely in CSS
        const incidentClassName = (this.props.incident.closedAt ? "active" : "");

        return (
            <tr className={incidentClassName}>
                <td>{this.props.incident.name}</td>
                <td>{this.props.incident.location}</td>
                <td className="no-print">
                    <a href={FlowHelpers.pathFor('journal', { incident: this.props.incident._id } )} type="button" className="btn btn-primary">
                        <i className="fa fa-lg fa-bars"></i>&nbsp; Journal
                    </a>
                </td>
                <td>{this.getDate(this.props.incident.createdAt)}</td>
                <td>{this.getDate(this.props.incident.closedAt)}</td>
                <td>{this.props.incident.text}</td>
                <td className="no-print">
                    <a href={FlowHelpers.pathFor('incidentEditor', { incident: this.props.incident._id } )} type="button" className="btn btn-primary">
                        <i className="fa fa-lg fa-pencil"></i>
                    </a>
                </td>
            </tr>
        );
    }
};
