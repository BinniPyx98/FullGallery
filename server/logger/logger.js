const SimpleNodeLogger = require('simple-node-logger')
const opts = {
    errorEventName:'error',
    logFilePath:'./logger/info.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
};

const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports = log;