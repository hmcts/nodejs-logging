const moment = require('moment')
const winston = require('winston')

const container = new winston.Container()
const tsFormat = () => (moment().format('YYYY-MM-DDTHH:mm:ssZ'))

function transports (label) {
  return [new winston.transports.Console({
    level: process.env.LOG_LEVEL || 'INFO',
    prettyPrint: process.env.PRETTY_PRINT || false,
    json: process.env.JSON_PRINT || false,
    timestamp: tsFormat,
    label: label
  })]
}

class Logger {

  static getLogger (name) {
    return container.add(name, { transports: transports(name) })
  }
}

module.exports = Logger
