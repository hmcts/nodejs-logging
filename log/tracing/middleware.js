const uuid = require('uuid')

const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER } = require('./headers')

function tracingHeadersMiddleware (req, res, next) {
  const id = uuid()
  req.headers[REQUEST_ID_HEADER] = id
  req.headers[ROOT_REQUEST_ID_HEADER] = id
  next()
}

module.exports = {
  tracingHeadersMiddleware
}
