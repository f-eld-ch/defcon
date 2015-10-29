JournalTable = React.createClass({
    mixins: [ ReactMeteorData, SpinnerMixin],
    propTypes: {
        incident: React.PropTypes.string.isRequired,
    },
    getMeteorData() {
        let journalSubscription =  Meteor.subscribe('journal',this.props.incident);
        return {
            subscriptions: [journalSubscription],
            journal: Journal.find({incident: this.props.incident},{sort: { createdAt: -1}}).fetch()
        };
    },
    renderJournalEntries() {
        return this.data.journal.map((journal) => {
            return <JournalEntry key={journal._id} journal={journal} />;
        });
    },
    render() {
        return (
            <div>
            <h2>Journal</h2>
            <div className="table-responsive">
                <table className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Zeit</th>
                            <th>Sender</th>
                            <th>Emfänger</th>
                            <th>Nachricht</th>
                            <th className="no-print" />
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
