import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
//import coreModule from './modules/core';
import journalModule from './modules/journal';
import incidentModule from './modules/incidents';

import _usersModule from './modules/_users';

// init context
const context = initContext();

// create app
const app = createApp(context);
//app.loadModule(coreModule);
//app.loadModule(journalModule);
app.loadModule(incidentModule);
app.loadModule(_usersModule);

app.init();
