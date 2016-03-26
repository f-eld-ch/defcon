JournalEntryControls = React.createClass({
    propTypes: {
        message: React.PropTypes.object.isRequired,
        showControls: React.PropTypes.bool.isRequired,
    },
    togglePriority: function() {
        event.preventDefault();
        if (this.props.message) {
            Meteor.call("toggleJournalMessagePriority", this.props.message._id);
        }
        return;
    },
    renderEditButton: function() {
        let difference = moment().diff(moment(this.props.message.insertedAt),'seconds');
        if ( this.props.message.insertedAt && difference <= 60 ){
            return (
                <a href={FlowHelpers.pathFor('journalEditor', { incident: this.props.message.incident, message: this.props.message._id })}  type="button" className="btn btn-primary btn-xs"><i className="fa fa-lg fa-pencil"/>&nbsp; Bearbeiten</a>
            );
        }

    },
    render: function() {
        if (this.props.showControls) {
            return (
                    <div className="col-xs-12">
                        <button type="submit" className="btn btn-warning btn-xs" onClick={this.togglePriority}><i className="fa fa-lg fa-exclamation-circle"></i>&nbsp;Wichtig</button>
                        {this.renderEditButton()}
                    </div>
            );
        }
        return (<div></div>);
    }
});
