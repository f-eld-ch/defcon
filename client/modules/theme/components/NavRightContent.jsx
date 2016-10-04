import React from 'react';

import _userControls from './UserControls.jsx';
import authComposer  from '../../core/composers/auth.jsx';


const UserControls = authComposer(_userControls);

export default class extends React.Component {
  render() {
    return (
      <UserControls classVersion="navbar-nav"/>
    )
  }
}
