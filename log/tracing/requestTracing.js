const uuid = require('uuid')

const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER, ORIGIN_REQUEST_ID_HEADER } = require('./headers')

class RequestTracing {
  static middleware (req, res, next) {
    const id = uuid()
    req.headers[REQUEST_ID_HEADER] = id
    req.headers[ROOT_REQUEST_ID_HEADER] = id
    req.headers[ORIGIN_REQUEST_ID_HEADER] = undefined
    next()
  }
}

module.exports = RequestTracing
