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
    getPriority: function(priority) {
        if (!priority) {
            return "";
        }
        if (priority == "important") {
            return "danger";
        }
        if (priority == "warning") {
            return "warning";
        }
        // return nothing else
        return "";
    },
    render: function() {
        return (
            <tr className={this.getPriority(this.props.message.priority)}>
                <td>{this.getDate(this.props.message.createdAt)}</td>
                <td>{this.props.message.sender}</td>
                <td>{this.props.message.receiver}</td>
                <td><span className="pre">{this.props.message.text}</span></td>
                <td className="hidden-print">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"><i className="fa fa-lg fa-pencil"></i></button>
                        <ul className="dropdown-menu">
                            <li></li>
                        </ul>
                    </div>
                </td>
            </tr>
        );
    }
});
