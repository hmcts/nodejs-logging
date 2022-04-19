const moment = require('moment')
const winston = require('winston')

const container = new winston.Container()

function timestamp() {
  return moment().format('YYYY-MM-DDTHH:mm:ssZ')
}

function transport(label) {
  return new winston.transports.Console({
    level: (process.env.LOG_LEVEL || 'INFO').toLowerCase(),
    formatter: process.env.JSON_PRINT ? format.json() : format.label({ label }),
    timestamp
  })
}

class Logger {

  static getLogger(name) {
    return container.add(name, {transports: [transport(name)]})
  }
}

module.exports = Logger
