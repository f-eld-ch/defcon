Default = React.createClass({
  render() {

    if (this.props.bottom){
        return (
          <div className="app-root">
            <AppHeader />
            <div className="container-fluid">
                <div className="main">
                    {this.props.yield}
                </div>
            </div>
            <div className="container-fluid">
                <div className="main">
                    {this.props.bottom}
                </div>
            </div>
          </div>
        );
    }
    else {
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
  }
});
