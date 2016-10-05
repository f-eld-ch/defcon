import React from 'react';

export default class extends React.Component {
  render() {
    const {message,clearErrors} = this.props;
    if (message) {
        return (
              <div className='alert alert-danger fade in hidden-print'>
                <a onClick={clearErrors} className="close" data-dismiss="alert" aria-label="close"><i className="fa fa-close"></i></a>
                <strong>Fehler:</strong> {message}
              </div>
        );
    }
    return null;
  }

}
