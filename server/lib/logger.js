import * as winston from 'winston';

export const logger = new winston.Logger();

//Configure overrides
switch((process.env.NODE_ENV || '').toLowerCase()){
    case 'test':
        break;

    case 'production':
      logger.add(winston.transports.Console, {
        colorize: true,
        timestamp: true,
        level: 'info'
      });
      break;

    default:
    logger.add(winston.transports.Console, {
      colorize: true,
      timestamp: false,
      level: 'silly'
    });
    break;
}
