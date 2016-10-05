import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import addInitialUsers from './configs/initial_users.js';
import accountsConfig from './configs/accounts-config.js';
import {logger} from '/server/lib/logger';



publications();
methods();
addInitialData();
addInitialUsers();
accountsConfig();
logger.info('Server started');
