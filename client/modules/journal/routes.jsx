import React   from 'react';
import {mount} from 'react-mounter';

import {LayoutDefault} from '/client/configs/theme.jsx';
import JournalAdd      from './containers/journal_add.jsx';
import JournalList     from './containers/journal_list.jsx';

export default function(injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/incidents/:incidentId/journal/add', {
    name: 'journal.add',
    action({incidentId}) {
      mount(MainLayoutCtx, {
        content: () => (<JournalAdd incidentId={incidentId}/>)
      });
    }
  });

  FlowRouter.route('/incidents/:incidentId/journal', {
    name: 'journal.list',
    action({incidentId}) {
      mount(MainLayoutCtx, {
        content: () => (<JournalList incidentId={incidentId}/>)
      });
    }
  });
}
