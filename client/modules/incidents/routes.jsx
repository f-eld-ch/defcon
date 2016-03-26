import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
  Simple
} from '/client/configs/theme.jsx';

import IncidentsList   from './containers/incidents/collection.jsx';
import IncidentsEdit   from './containers/incidents/edit.jsx';
import IncidentsAdd    from './containers/incidents/add.jsx';
// import ColorsEdit from './containers/colors/edit.jsx';
//
export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/incdent', {
    name: 'incidents.colorsList',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<IncidentsList />)
      });
    }
  });

  FlowRouter.route('/incidents/add', {
    name: 'incidents.colorsAdd',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<IncidentsAdd />)
      });
    }
  });

  FlowRouter.route('/incidents/:_id', {
    name: 'incidents.colorsView',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<IncidentsEdit _id={_id}/>)
      });
    }
  });

  FlowRouter.route('/incidents/:_id/edit', {
    name: 'incidents.colorsEdit',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<IncidentsEdit _id={_id}/>)
      });
    }
  });

};
