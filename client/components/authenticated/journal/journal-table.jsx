JournalTable = React.createClass({
    mixins: [ ReactMeteorData ],
    propTypes: {
        incident: React.PropTypes.string.isRequired,
    },
    getMeteorData: function() {
        let journalSubscription =  Meteor.subscribe('journal',this.props.incident);
        return {
            subscriptions: [journalSubscription],
            isDataReady: journalSubscription.ready(),
            messages: Journal.find({incident: this.props.incident},{sort: { createdAt: -1}}).fetch()
        };
    },
    renderJournalEntries: function() {
        return this.data.messages.map((message) => {
            return <JournalTableEntry key={message._id} message={message} />;
        });
    },
    render: function() {
        return (
            <div>
                <h2>Journal</h2>
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
                            {this.renderJournalEntries()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});
