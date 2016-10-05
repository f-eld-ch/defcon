import React from 'react';

import _userControls from './UserControls.jsx';
import navComposer  from '../../core/composers/navigation.jsx';


const UserControls = navComposer(_userControls);

export default class extends React.Component {
  render() {
    return (
      <UserControls classVersion="navbar-nav"/>
    )
  }
}
