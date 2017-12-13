# Node.js Logging

[![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/nodejs-logging.svg)](https://greenkeeper.io/)

A logging component used by Reform's Node.js applications. Some background info:
* there are 8 log levels: `ALL`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL` and `OFF`.
* a level can be set via an environment variable `LOG_LEVEL`, the default is `INFO`.
* there are 3 types of logging output which is set via an environment variable `LOG_OUTPUT`, the default is `human`:
 - `human` - single line of a human readable output
 - `single` - a single line of JSON output
 - `multi` - a multiline formatted JSON output
* by default logging is turned off when running the unit tests.

## Usage

Add it as your project's dependency:

```bash
yarn add @hmcts/nodejs-logging
```

Require it:

```javascript
const { Logger } = require('@hmcts/nodejs-logging')
```

Set the logging configuration. Should be done once at application startup:

```javascript
Logger.config({ 
    microservice: 'your-service-name', 
    team: 'your-team',
    environment: 'some-environemnt'
})
```

Then you can create a logger instance and use it to log information:

```javascript
const logger = Logger.getLogger('app.js') // app.js is just an example, can be anything that's meaningful to you

logger.info({
  message: 'Yay, logging!'
})
```

### Access logging for Express applications 

Optionally you can use the built-in Express access logger:

```javascript
const { Express } = require('@hmcts/nodejs-logging')

app.use(Express.accessLogger())
```

It will log all requests made against your application. For example, a typical HTTP 404 log error when encountering an error would look like the following:

```
{
  responseCode: 404,
  message: 'Not Found',
  fields: [],
  level: 'ERROR',
  environment: 'some-environemnt',
  hostname: 'My-MacBook-Pro.local',
  rootRequestId: '',
  requestId: '',
  originRequestId: '',
  type: 'nodejs',
  microservice: 'your-service-name',
  team: 'your-team',
  timestamp: '2017-01-27T11:27:23+00:00'
}
```

## Units Tests

Just do

```
yarn test
```
