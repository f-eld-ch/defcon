import * as winston from 'winston';
import * as path from 'path';

export const logger = new winston.Logger();

//Configure overrides
switch((process.env.NODE_ENV || '').toLowerCase()){
  case 'production':
    logger.add(winston.transports.File, {
      filename: path.resolve('application.log'),

      // TODO: Set log folder
      // FIXME: Create it before run or it won't log!!
      dirname: path.resolve(__dirname, '../logs/'),

      handleExceptions: true,
      exitOnError: false,
      level: 'warn'
    });
    break;

  case 'test':
    break;

  default:
    logger.add(winston.transports.Console, {
      colorize: true,
      timestamp: true,
      level: 'silly'
    });
    break;
}
