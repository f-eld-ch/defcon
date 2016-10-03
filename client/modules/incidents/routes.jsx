import React from 'react';
import {mount} from 'react-mounter';

import {LayoutDefault}  from '/client/configs/theme.jsx';
import IncidentsAdd     from './containers/incidents/add.jsx';
import IncidentsList    from './containers/incidents/list.jsx';
import Incident         from './containers/incidents/single.jsx';
import IncidentEdit     from './containers/incidents/edit.jsx';


export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/incidents/add', {
    name: 'incident.add',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<IncidentsAdd />)
      });
    }
  });

  FlowRouter.route('/incidents', {
    name: 'incidents.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<IncidentsList />)
      });
    }
  });

  FlowRouter.route('/incidents/:incidentId', {
    name: 'incidents.single',
    action({incidentId}) {
      mount(MainLayoutCtx, {
        content: () => (<Incident incidentId={incidentId}/>)
      });
    }
  });

  FlowRouter.route('/incidents/:incidentId/edit', {
    name: 'incidents.edit',
    action({incidentId}) {
      mount(MainLayoutCtx, {
        content: () => (<IncidentEdit incidentId={incidentId}/>)
      });
    }
  });
}
