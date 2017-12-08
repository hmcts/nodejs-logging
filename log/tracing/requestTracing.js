const uuid = require('uuid')

const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER, ORIGIN_REQUEST_ID_HEADER } = require('./headers')

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

const setNewRequestTracingHeaders = (req) => {
  const id = uuid()
  req.headers[REQUEST_ID_HEADER] = id
  req.headers[ROOT_REQUEST_ID_HEADER] = id
  req.headers[ORIGIN_REQUEST_ID_HEADER] = undefined
}

const tracingHeadersNotPresentOrInvalid = (req) => {
  return notUUID(req.headers[REQUEST_ID_HEADER])
    || notUUID(req.headers[ROOT_REQUEST_ID_HEADER])
    || notUUID(req.headers[ORIGIN_REQUEST_ID_HEADER])
}

const notUUID = (uuidString) => {
  return !UUID_REGEX.test(uuidString)
}


class RequestTracing {
  static middleware (req, res, next) {
    if (tracingHeadersNotPresentOrInvalid(req)) {
      setNewRequestTracingHeaders(req)
    }
    next()
  }
}

module.exports = RequestTracing
