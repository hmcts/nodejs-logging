'use strict'
/* global describe, it, beforeEach */

const { expect, sinon } = require('../../chai-sinon')

const { requestTracingMiddleware } = require('../../../log/tracing/middleware')
const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER } = require('../../../log/tracing/headers')

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

  it('should set requestId header', () => {
    requestTracingMiddleware(req, req, next)
    expect(req.headers[REQUEST_ID_HEADER]).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
    expect(req.headers[ROOT_REQUEST_ID_HEADER]).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  })
})
