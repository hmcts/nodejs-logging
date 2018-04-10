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

  describe('Adding user defined fields to a log entry object', () => {

    let logged
    const logger = myLogger.getLogger('test')
    logger.remove(winston.transports.Console)
    const spy = sinon.spy()
    logger.add(spyLogger, { level: 'info', spy: spy })

    const logEntry = {
      message: 'this is some information',
      responseCode: 404,
      rootRequestId: 'ac-23-4a-b8-4f',
      requestId: 'bc-63-4a-b8-4g',
      originRequestId: 'cc-93-4a-b8-4i',
      environment: 'production',
      hostname: 'myhostname',
      fields: [
        { key: 'a', value: 1 },
        { key: 'b', value: 'foo' },
        { key: 'c', value: [1, 2, 3] }
      ]
    }

    beforeEach(() => {
      logger.info(logEntry) // Any log level will do.
    })

    it('should set the level field', () => {
      expect(spy.withArgs()).to.eql('info')
    })

    it('should set the message field', () => {
      expect(logged.message).to.eql('this is some information')
    })

    it('should set the response code', () => {
      expect(logged.responseCode).to.eql(404)
    })

    it('should set the rootRequestId', () => {
      expect(logged.rootRequestId).to.eql('ac-23-4a-b8-4f')
    })

    it('should set the requestId', () => {
      expect(logged.requestId).to.eql('bc-63-4a-b8-4g')
    })

    it('should set the originRequestId', () => {
      expect(logged.originRequestId).to.eql('cc-93-4a-b8-4i')
    })

    it('should set the environment', () => {
      expect(logged.environment).to.eql('production')
    })

    it('should set the hostname', () => {
      expect(logged.hostname).to.be.a('string')
      expect(logged.hostname.length > 0).to.eql(true)
    })

    it('should set the fields', () => {
      expect(logged.fields.length).to.eql(3)
      expect(logged.fields[0].key).to.eql('a')
      expect(logged.fields[1].key).to.eql('b')
      expect(logged.fields[2].key).to.eql('c')
      expect(logged.fields[0].value).to.eql(1)
      expect(logged.fields[1].value).to.eql('foo')
      expect(logged.fields[2].value).to.eql([1, 2, 3])
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
