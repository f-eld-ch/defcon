import React from 'react';

import NavHeader from './NavHeader.jsx';
import NavLeftContent from './NavLeftContent.jsx';
import NavRightContent from './NavRightContent.jsx';

import AppConfig from '/client/configs/app.js';

export default class extends React.Component {

  render() {
    const {incident,content} = this.props;
    return (
      <div>
        <NavHeader
          brand={()=> (AppConfig.name) }
          leftContent={()=> (<NavLeftContent incidentId={incident}/>)}
          rightContent={()=> (<NavRightContent />) }
          incidentId={incident}
        />

        <div className="container-fluid">
            {content()}
        </div>
      </div>
    );
  }
}
