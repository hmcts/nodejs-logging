const uuid = require('uuid')
const { createNamespace, getNamespace } = require('continuation-local-storage')

const { REQUEST_ID_HEADER, ROOT_REQUEST_ID_HEADER, ORIGIN_REQUEST_ID_HEADER } = require('./headers')

const setInitialRequestTracingHeaders = (req) => {
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
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  return !UUID_REGEX.test(uuidString)
}

const STORAGE_NAMESPACE = 'requestHandlerLocalStorage'
const STORAGE_INITIAL_REQUEST = 'initialRequest'

class RequestTracing {
  static middleware (req, res, next) {
    if (tracingHeadersNotPresentOrInvalid(req)) {
      setInitialRequestTracingHeaders(req)
    }
    const localStorage = createNamespace(STORAGE_NAMESPACE)
    localStorage.run(() => {
      localStorage.set(STORAGE_INITIAL_REQUEST, req)
      next()
    })
  }

  static getInitialRequest () {
    const localStorage = getNamespace(STORAGE_NAMESPACE)
    return localStorage.get(STORAGE_INITIAL_REQUEST)
  }
}

module.exports = RequestTracing
