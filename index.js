'use strict'

let Logger = require('./log/Logger');
Logger.express = require('./log/express');
Logger.requestTracing = {
  headers: require('./log/tracing/headers'),
  middleware: require('./log/tracing/middleware')
}

module.exports = Logger;
