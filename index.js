'use strict'

let Logger = require('./log/Logger');

Logger.express = require('./log/express');
Logger.RequestTracing = require('./log/tracing/requestTracing')

module.exports = Logger;
