'use strict'
/* global beforeEach, before, after, describe, it */

const { expect } = require('../chai-sinon')
const winston = require('winston')

describe('Logging within the Node.js application', () => {

  describe('Creating a logger', () => {
    const Logger = require('../../log/Logger')
    const instance = Logger.getLogger('test')

    it('should set the transport to console', () => {
      expect(instance.transports[0]).to.be.instanceOf(winston.transports.Console)
    })

    it('should set default the level to INFO', () => {
      expect(instance.transports[0].level).to.eq('info')
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
