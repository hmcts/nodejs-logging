const moment = require('moment')
const winston = require('winston')
const {combine, timestamp, label, json} = require('logform').format

const container = new winston.Container()

function transport(loggerName) {
  const format = process.env.JSON_PRINT ? json() : label({ label: loggerName })
  const timeStamper = timestamp({ format: moment().format('YYYY-MM-DDTHH:mm:ssZ') });

  return new winston.transports.Console({
    level: (process.env.LOG_LEVEL || 'INFO').toLowerCase(),
    format: combine(format, timeStamper)
  })
}

class Logger {

  static getLogger(name) {
    return container.add(name, {transports: [transport(name)]})
  }
}

module.exports = Logger
