Default = React.createClass({
  render() {
    return (
      <div className="app-root">
        <AppHeader />
        <div className="container-fluid">
            <div className="main">
                {this.props.yield}
            </div>
        </div>
      </div>
    );
  }
});
