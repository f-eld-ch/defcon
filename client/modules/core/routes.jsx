import React from 'react';
import {mount} from 'react-mounter';

import {LayoutDefault} from '/client/configs/theme.jsx';
import Home from './components/home.jsx';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
