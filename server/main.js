import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import addInitialUsers from './configs/initial_users.js';
import {logger} from '/server/lib/logger';



publications();
methods();
addInitialData();
addInitialUsers();
logger.info("Server started");
