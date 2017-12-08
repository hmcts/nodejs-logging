'use strict'
/* global describe, it, beforeEach */

const { expect, sinon } = require('../../chai-sinon')

const { requestTracingMiddleware } = require('../../../log/tracing/middleware')
const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER, ORIGIN_REQUEST_ID_HEADER } = require('../../../log/tracing/headers')

describe('requestTracingMiddleware', () => {
  let req, res, next

  beforeEach(() => {
    req = {
      headers: { }
    }
    res = { }
    next = sinon.stub()
  })

  it('should call the next function', () => {
    requestTracingMiddleware(req, res, next)
    expect(next).calledOnce
  })

  it('should set Request-Id header with UUID', () => {
    requestTracingMiddleware(req, req, next)
    expect(req.headers[REQUEST_ID_HEADER]).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  })

  it('should set Root-Request-Id header with UUID', () => {
    requestTracingMiddleware(req, req, next)
    expect(req.headers[ROOT_REQUEST_ID_HEADER]).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  })

  it('should set Request-Id and Root-Request-Id headers with the same value', () => {
    requestTracingMiddleware(req, req, next)
    expect(req.headers[REQUEST_ID_HEADER]).to.equal(req.headers[ROOT_REQUEST_ID_HEADER])
  })

  it('should not set Origin-Request-Id header', () => {
    requestTracingMiddleware(req, req, next)
    expect(req.headers[ORIGIN_REQUEST_ID_HEADER]).to.be.undefined
  })
})
