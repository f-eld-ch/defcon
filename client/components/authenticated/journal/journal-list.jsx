JournalList = React.createClass({
    mixins: [ ReactMeteorData ],
    propTypes: {
        incident: React.PropTypes.string.isRequired,
        showControls: React.PropTypes.bool.isRequired,
    },
    getInitialState: function() {
        return {
            importantonly: false,
        };
    },
    getMeteorData: function() {
        let journalSubscription =  Meteor.subscribe('journal',this.props.incident);
        return {
            subscriptions: [journalSubscription],
            isDataReady: journalSubscription.ready(),
            messages: this.state.importantonly ? Journal.find({incident: this.props.incident, priority: true},{sort: { createdAt: -1}}).fetch() : Journal.find({incident: this.props.incident},{sort: { createdAt: -1}}).fetch()
        };
    },
    renderJournalEntries: function() {
        return this.data.messages.map((message) => {
            if (this)
            return <JournalEntry key={message._id} message={message} showControls={this.props.showControls}/>;
        });
    },
    togglePriority: function() {
        event.preventDefault();
        console.log("toggling priority");
        this.setState({importantonly: !this.state.importantonly});
        return;
    },
    render: function() {
        let time = moment(new Date).format('DD.MM.YYYY HH:mm');
        return (
            <div>
                <div className="pull-right hidden-print">
                    <button type="submit" className="btn btn-warning btn-xs" onClick={this.togglePriority}><i className="fa fa-lg fa-exclamation-circle"></i>&nbsp;Zeige nur wichtig Nachrichten</button>
                </div>
                <h2>Journal</h2>
                <JournalTable messages={this.data.messages} printonly={true} />
                <div className="hidden-print">
                    {this.renderJournalEntries()}
                </div>
            </div>
        );
    }
});
