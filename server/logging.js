// add papertrail logging on the server
papertrailPort = process.env.PAPERTRAIL_PORT;
papertrailHost = process.env.PAPERTRAIL_HOST;

if (typeof(papertrailHost) !== 'undefined' && typeof(papertrailPort) !== 'undefined') {

    var papertrailOptions = {
        levels: {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
            auth: 4
        },
        colors: {
            debug: 'blue',
            info:  'green',
            warn:  'red',
            error: 'red',
            auth:  'red'
        },

        host: papertrailHost,
        port: papertrailPort,
        handleExceptions: true,
        json: true,
        colorize: true,
        logFormat: function(level, message) {
            return '[' + level + '] ' + message;
        }
    };

    // Simply add the papertrail transport
    logger.addTransport('papertrail', papertrailOptions)
    logger.info("logging to papertrail initalized");
}

// add logging
var consoleOptions = {
    colorize: true,
    level: 'debug',
    levels : {debug: 0, info : 1, warn: 2, error: 3},
    colors : {debug: 'blue', info : 'green', warn: 'orange', error: 'red'},
    handleExeptions: true,
    humanReadableUnhandledException: true,
};

// Add & configure the console transport
logger.addTransport('console', consoleOptions);
