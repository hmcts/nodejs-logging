/* global describe, it */

const expect = require('chai').expect;
const winston = require('winston')

const AccessLogger = require('../../log/express').AccessLoggingHandler;
const Logger = require('../../log/Logger')

describe('AccessLogger', () => {

  it('should have a default formatter', () => {
    const accessLogger = new AccessLogger()
    expect(accessLogger.formatter).to.be.instanceOf(Function)
  })

  it('should have a default level function', () => {
    const accessLogger = new AccessLogger()
    expect(accessLogger.level).to.be.instanceOf(Function)
  })
})
