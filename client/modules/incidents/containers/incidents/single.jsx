// import {useDeps} from 'react-simple-di';
// import {composeWithTracker, composeAll} from 'react-komposer';
//
import dataComposer from '../../composers/incidents/single.jsx';
import Component from '../../components/incidents/incident-table-entry.jsx';

export default dataComposer(Component);

// export default composeAll(
//     composeWithTracker(singleComposer),
//     useDeps()
//   )(Component);
