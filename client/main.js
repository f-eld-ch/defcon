import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule       from './modules/core';
import incidentModule   from './modules/incidents';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);

//app.loadModule(journalModule);
app.loadModule(incidentModule);

app.init();
