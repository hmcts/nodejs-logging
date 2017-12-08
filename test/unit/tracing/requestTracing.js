'use strict'
/* global describe, context, it, beforeEach */

const uuid = require('uuid')

const { expect, sinon } = require('../../chai-sinon')

const RequestTracing = require('../../../log/tracing/requestTracing')
const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER, ORIGIN_REQUEST_ID_HEADER } = require('../../../log/tracing/headers')

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

describe('RequestTracing', () => {
  describe('middleware', () => {
    const requestTracingMiddleware = RequestTracing.middleware
    const GIBBERISH = 'gibberish'
    let req, res, next

    beforeEach(() => {
      req = {
        headers: { }
      }
      res = { }
      next = sinon.stub()
    })

    function itShouldSetNewRequestIdValues() {
      it(`should set ${REQUEST_ID_HEADER} header with UUID`, () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[REQUEST_ID_HEADER]).to.match(UUID_REGEX)
      })

      it(`should set ${ROOT_REQUEST_ID_HEADER} header with UUID`, () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[ROOT_REQUEST_ID_HEADER]).to.match(UUID_REGEX)
      })

      it(`should set ${REQUEST_ID_HEADER} and ${ROOT_REQUEST_ID_HEADER} headers with the same value`, () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[REQUEST_ID_HEADER]).to.equal(req.headers[ROOT_REQUEST_ID_HEADER])
      })

      it(`should not set ${ORIGIN_REQUEST_ID_HEADER} header`, () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[ORIGIN_REQUEST_ID_HEADER]).to.be.undefined
      })

      it(`should overwrite existing ${ROOT_REQUEST_ID_HEADER} value if it's present`, () => {
        req.headers[ROOT_REQUEST_ID_HEADER] = 'gibberish'
        requestTracingMiddleware(req, req, next)
        expect(req.headers[ROOT_REQUEST_ID_HEADER]).not.to.equal('gibberish')
      })

      it(`should blank existing ${ORIGIN_REQUEST_ID_HEADER} if it's present`, () => {
        req.headers[ORIGIN_REQUEST_ID_HEADER] = 'gibberish'
        requestTracingMiddleware(req, req, next)
        expect(req.headers[ORIGIN_REQUEST_ID_HEADER]).to.be.undefined
      })

      it('should call the next function', () => {
        requestTracingMiddleware(req, res, next)
        expect(next).calledOnce
      })
    }

    context(`when ${REQUEST_ID_HEADER} is not initially present`, () => {
      itShouldSetNewRequestIdValues()
    })

    context(`when ${REQUEST_ID_HEADER} is not a valid UUID`, () => {
      beforeEach(() => {
        req.headers[REQUEST_ID_HEADER] = GIBBERISH
      })

      itShouldSetNewRequestIdValues()
    })

    context(`when ${REQUEST_ID_HEADER} is valid UUID but ${ROOT_REQUEST_ID_HEADER} is not`, () => {
      beforeEach(() => {
        req.headers[REQUEST_ID_HEADER] = uuid()
        req.headers[ROOT_REQUEST_ID_HEADER] = GIBBERISH
      })

      itShouldSetNewRequestIdValues()
    })

    context(`when ${REQUEST_ID_HEADER} is valid UUID but ${ORIGIN_REQUEST_ID_HEADER} is not`, () => {
      beforeEach(() => {
        req.headers[REQUEST_ID_HEADER] = uuid()
        req.headers[ORIGIN_REQUEST_ID_HEADER] = GIBBERISH
      })

      itShouldSetNewRequestIdValues()
    })

    context('when all header values are valid UUIDs', () => {
      const requestId = uuid()
      const rootRequestId = uuid()
      const originRequestId = uuid()

      beforeEach(() => {
        req.headers[REQUEST_ID_HEADER] = requestId
        req.headers[ROOT_REQUEST_ID_HEADER] = rootRequestId
        req.headers[ORIGIN_REQUEST_ID_HEADER] = originRequestId
      })

      it('should keep those values', () => {
        requestTracingMiddleware(req, req, next)
        expect(req.headers[REQUEST_ID_HEADER]).to.equal(requestId)
        expect(req.headers[ROOT_REQUEST_ID_HEADER]).to.equal(rootRequestId)
        expect(req.headers[ORIGIN_REQUEST_ID_HEADER]).to.equal(originRequestId)
      })

      it('should call the next function', () => {
        requestTracingMiddleware(req, res, next)
        expect(next).calledOnce
      })
    })
  })
})
