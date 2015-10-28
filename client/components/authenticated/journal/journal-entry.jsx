JournalEntry = React.createClass({
    propTypes: {
        journal: React.PropTypes.object.isRequired,
    },
    getDate(date) {
        if (!date) {
            return;
        }
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
    render() {
        return (
            <tr>
                <td>{this.getDate(this.props.journal.createdAt)}</td>
                <td>{this.props.journal.sender}</td>
                <td>{this.props.journal.receiver}</td>
                <td><span className="pre">{this.props.journal.text}</span></td>


                <td className="no-print">
                    <a href={FlowHelpers.pathFor('journalEditor', { journal: this.props.journal._id } )}  type="button" className="btn btn-primary btn-xs">
                        <span className="glyphicon glyphicon-edit"></span>
                    </a>
                </td>
            </tr>
        );
    }
});
