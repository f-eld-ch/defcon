JournalEntry = React.createClass({
    propTypes: {
        message: React.PropTypes.object.isRequired,
        showControls: React.PropTypes.bool.isRequired,
    },
    getDate: function(date) {
        if (!date) {
            return;
        }
        return moment(date).format('DD.MM.YYYY HH:mm');
    },
    getPriority: function(priority) {
        if (priority) {
            return "priority";
        }
        // return nothing else
        return;
    },
    render: function() {
        return (
            <div className="row journal-entry" id={this.getPriority(this.props.message.priority)}>
                <div className="col-md-4 col-sm-12">
                    <div className="row journal-entry-heading">
                        <div className="col-xs-1 col-sm-1 col-md-1">
                            <i className="fa fa-comments"></i>
                        </div>
                        <div className="col-xs-4 col-sm-5 col-md-4">
                            {this.props.message.sender}
                        </div>
                        <div className="col-xs-1 col-sm-1 col-md-1">
                            <i className="fa fa-arrow-right"></i>
                        </div>
                        <div className="col-xs-4 col-sm-5 col-md-4">
                            {this.props.message.receiver}
                        </div>
                    </div>
                    <div className="row journal-entry-heading">
                        <div className="col-xs-1 col-sm-1 col-md-1"><i className="fa fa-clock-o"></i></div>
                        <div className="col-xs-10 col-sm-11 col-md-10">
                             {this.getDate(this.props.message.createdAt)}
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-xs-12">
                    <pre className="danger">{this.props.message.text}</pre>
                </div>
                <JournalEntryControls key={this.props.message._id} message={this.props.message} showControls={this.props.showControls} />
            </div>
        );
    }
});
