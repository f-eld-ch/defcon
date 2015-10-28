JournalManager = React.createClass({
    mixins: [ ReactMeteorData, SpinnerMixin],
    propTypes: {
        incident: React.PropTypes.string.isRequired,
    },
    getMeteorData() {
        let journalSubscription =  Meteor.subscribe('journal',this.props.incident);
        return {
            subscriptions: [journalSubscription],
            journal: Journal.find({incident: this.props.incident,}).fetch()
        };
    },
    render() {
        return (
            <h3>Journal for {this.props.incident}</h3>
        );
    }
});
