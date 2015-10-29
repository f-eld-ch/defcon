JournalManager = React.createClass({
    render() {
        return (
            //<JournalEditor new=true/>
            <div className="container-fluid journal">
                <JournalTable incident={this.props.incident} />
            </div>
        );
    }
});
