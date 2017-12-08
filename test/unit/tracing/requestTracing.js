'use strict'
/* global describe, context, it, beforeEach */

const { expect, sinon } = require('../../chai-sinon')

const RequestTracing = require('../../../log/tracing/requestTracing')
const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER, ORIGIN_REQUEST_ID_HEADER } = require('../../../log/tracing/headers')

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

describe('RequestTracing', () => {
  describe('middleware', () => {
    const requestTracingMiddleware = RequestTracing.middleware
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

    context('when headers are not initially present', () => {
      it('should set Request-Id header with UUID', () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[REQUEST_ID_HEADER]).to.match(UUID_REGEX)
      })

      it('should set Root-Request-Id header with UUID', () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[ROOT_REQUEST_ID_HEADER]).to.match(UUID_REGEX)
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
  })
})
