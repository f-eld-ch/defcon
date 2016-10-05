import React   from 'react';
import {mount} from 'react-mounter';

import {LayoutDefault} from '/client/configs/theme.jsx';
import JournalAdd      from './containers/journal_add.jsx';
import JournalEdit      from './containers/journal_edit.jsx';
import JournalList     from './containers/journal_list.jsx';

export default function(injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/incidents/:incidentId/journal', {
    name: 'journal.list',
    action({incidentId}) {
      mount(MainLayoutCtx, {
        content: () => (
            <div>
                <JournalList incidentId={incidentId} showControls={false}/>
            </div>
        )
      });
    }
  });

  FlowRouter.route('/incidents/:incidentId/journal/write', {
    name: 'journal.list',
    action({incidentId}) {
      mount(MainLayoutCtx, {
        content: () => (
            <div>
                <JournalAdd incidentId={incidentId}/>
                <JournalList incidentId={incidentId} showControls={true}/>
            </div>
        )
      });
    }
  });

  FlowRouter.route('/incidents/:incidentId/journal/:messageId/edit', {
    name: 'journal.list',
    action({incidentId,messageId}) {
      mount(MainLayoutCtx, {
          content: () => (
              <div>
                  <JournalEdit incidentId={incidentId} messageId={messageId}/>
                  <JournalList incidentId={incidentId} showControls={true}/>
              </div>
          )
      });
    }
  });
}
