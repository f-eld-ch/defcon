JournalTable = React.createClass({
    propTypes: {
        messages: React.PropTypes.array.isRequired,
        printonly: React.PropTypes.bool.isRequired,
    },
    renderJournalTableEntries: function() {
        return this.props.messages.map((message) => {
            return <JournalTableEntry key={message._id} message={message} />;
        });
    },
    getPrintClass: function() {
        if (this.props.printonly) {
            return "row visible-print-block";
        }
        else {
            return "row";
        }
    },
    render: function() {
        let time = moment(new Date).format('DD.MM.YYYY HH:mm');
        return (
            <div className={this.getPrintClass()}>
                <h4>Stand: {time}</h4>
                <div className="table-responsive">
                    <table className="table table-hover table-condensed journal-table">
                        <thead>
                            <tr>
                                <th>Zeit</th>
                                <th>Sender</th>
                                <th>Emfänger</th>
                                <th>Nachricht</th>
                                <th className="hidden-print" />
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderJournalTableEntries()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});
