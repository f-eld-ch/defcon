JournalTableEntry = React.createClass({
    propTypes: {
        message: React.PropTypes.object.isRequired,
    },
    getDate: function(date) {
        if (!date) {
            return;
        }
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
    render: function() {
        return (
            <tr>
                <td>{this.getDate(this.props.message.createdAt)}</td>
                <td>{this.props.message.sender}</td>
                <td>{this.props.message.receiver}</td>
                <td><span className="pre">{this.props.message.text}</span></td>


                <td className="no-print">
                    <a href={FlowHelpers.pathFor('journalEditor', { incident: this.props.message.incident, message: this.props.message._id } )}  type="button" className="btn btn-primary btn-sm">
                        <i className="fa fa-pencil"></i>
                    </a>
                </td>
            </tr>
        );
    }
});
