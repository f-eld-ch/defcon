import React from 'react';

import NavHeader from './NavHeader.jsx';
import NavLeftContent from './NavLeftContent.jsx';
import NavRightContent from './NavRightContent.jsx';

import AppConfig from '/client/configs/app.js';

export default class extends React.Component {

  render() {
    const {FlowRouter} = this.props;
    return (
      <div>

        <NavHeader
          brand={()=> (AppConfig.name) }
          leftContent={()=> (<NavLeftContent />) }
          rightContent={()=> (<NavRightContent />) }
        />

        <div className="container-fluid">
            {this.props.content()}
        </div>
      </div>
    );
  }
}
