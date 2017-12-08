'use strict'

let Logger = require('./log/Logger');

Logger.express = require('./log/express');

Logger.requestTracing = {
  headers: require('./log/tracing/headers'),
  RequestTracing: require('./log/tracing/requestTracing')
}

module.exports = Logger;
