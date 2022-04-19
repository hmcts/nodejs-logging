const winston = require('winston')
const {combine, timestamp, label, json, printf, colorize} = require('logform').format

const container = new winston.Container()

class Logger {

  static getLogger(name) {
    const print = printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`)
    const format = process.env.JSON_PRINT ? json() : print
    const level = (process.env.LOG_LEVEL || 'INFO').toLowerCase()

    return container.add(name, {
      format: combine(colorize(), label({ label: name }), timestamp(), format),
      transports: [new winston.transports.Console({ level })]
    })
  }
}

module.exports = Logger
