JournalManager = React.createClass({
    render() {
        return (
            //<JournalEditor new=true/>

                <JournalTable incident={this.props.incident} />

        );
    }
});
