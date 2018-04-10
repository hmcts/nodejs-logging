'use strict'
/* global beforeEach, before, after, describe, it */

const { expect, assert, sinon } = require('../chai-sinon')
const spyLogger = require('winston-spy')
const winston = require('winston')

const myLogger = require('../../log/Logger')


describe('Logging within the Node.js application', () => {

  describe('Logging an event at a given level', () => {

    const testMessage = 'Hello World'
    const testMeta = { hello: 'world' }
    let logger
    let i = 0
    let spy

    beforeEach(() => {
      logger = myLogger.getLogger('test' + i++)
      logger.remove(winston.transports.Console)
      spy = sinon.spy()
    })

    afterEach(() => {
      logger.remove(spyLogger)
    })

    it('should log a message at level DEBUG', () => {
      logger.add(spyLogger, { level: 'debug', spy: spy })

      logger.debug(testMessage, testMeta)
      assert(spy.calledOnce)
      assert(spy.calledWith('debug', testMessage, testMeta))
    })

    it('should log a message for INFO when logger default level is DEBUG', () => {
      logger.add(spyLogger, { level: 'debug', spy: spy })

      logger.info(testMessage, testMeta)
      assert(spy.calledOnce)
      assert(spy.calledWith('info', testMessage, testMeta))
    })

    it('should log a message for WARN when logger default level is DEBUG', () => {
      logger.add(spyLogger, { level: 'debug', spy: spy })

      logger.warn(testMessage, testMeta)
      assert(spy.calledOnce)
      assert(spy.calledWith('warn', testMessage, testMeta))
    })

    it('should log a message for ERROR when logger default level is DEBUG', () => {
      logger.add(spyLogger, { level: 'debug', spy: spy })

      logger.error(testMessage, testMeta)
      assert(spy.calledOnce)
      assert(spy.calledWith('error', testMessage, testMeta))
    })

    it('should log a message for VERBOSE when logger default level is DEBUG', () => {
      logger.add(spyLogger, { level: 'debug', spy: spy })

      logger.verbose(testMessage, testMeta)
      assert(spy.calledOnce)
      assert(spy.calledWith('verbose', testMessage, testMeta))
    })

    it('should not log a message for SILLY when logger default level is DEBUG', () => {
      logger.add(spyLogger, { level: 'debug', spy: spy })

      logger.silly(testMessage, testMeta)
      assert(spy.notCalled)
    })

    it('should log a message at level INFO', () => {
      logger.add(spyLogger, { level: 'info', spy: spy })

      logger.info(testMessage, testMeta)

      assert(spy.calledOnce)
      assert(spy.calledWith('info', testMessage, testMeta))
    })

    it('should log a message at level WARN', () => {
      logger.add(spyLogger, { level: 'warn', spy: spy })

      logger.warn(testMessage, testMeta)

      assert(spy.calledOnce)
      assert(spy.calledWith('warn', testMessage, testMeta))
    })

    it('should log a message at level ERROR', () => {
      logger.add(spyLogger, { level: 'error', spy: spy })

      logger.error(testMessage, testMeta)

      assert(spy.calledOnce)
      assert(spy.calledWith('error', testMessage, testMeta))
    })

    it('should log a message at level VERBOSE', () => {
      logger.add(spyLogger, { level: 'verbose', spy: spy })

      logger.verbose(testMessage, testMeta)

      assert(spy.calledOnce)
      assert(spy.calledWith('verbose', testMessage, testMeta))
    })

    it('should log a message at level SILLY', () => {
      logger.add(spyLogger, { level: 'silly', spy: spy })

      logger.silly(testMessage, testMeta)

      assert(spy.calledOnce)
      assert(spy.calledWith('silly', testMessage, testMeta))
    })
  })

  describe('Obtaining a single instance of Logger', () => {

    let Logger, loggerInstance1, loggerInstance2, loggerInstance3

    beforeEach(() => {
      Logger = require('../../log/Logger')
      loggerInstance1 = Logger.getLogger('test1')
      loggerInstance2 = Logger.getLogger('test2')
      loggerInstance3 = Logger.getLogger('test3')
    })

    it('should create multiple instances', () => {
      expect(loggerInstance1).to.not.equal(loggerInstance2)
      expect(loggerInstance2).to.not.equal(loggerInstance3)
      expect(loggerInstance3).to.not.equal(loggerInstance1)
    })

  })

})
