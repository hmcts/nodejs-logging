# Node.js Logging

[![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/nodejs-logging.svg)](https://greenkeeper.io/)

A logging component used by Reform's Node.js applications. 
Some background info:

<b>This is not compatible with reform tactical logging spec and that for tactical applications logger 2.x should be used</b>.
* there are 6 log levels: 
```{ 
     error: 0, 
     warn: 1, 
     info: 2, 
     verbose: 3, 
     debug: 4, 
     silly: 5 
   }
```
* the default is `info`.

## Usage

Add it as your project's dependency:

```bash
yarn add @hmcts/nodejs-logging
```

Require it:

```javascript
const { Logger } = require('@hmcts/nodejs-logging')
```

Then you can create a logger instance and use it to log information:

```javascript
const logger = Logger.getLogger('app.js') // app.js is just an example, can be anything that's meaningful to you
```
usage are:

```
logger.info({
  message: 'Yay, logging!'
})
```
or
```
logger.log({
  level: 'info',
  message: 'What time is the testing at?'
});

 Outputs:
{ level: 'info',
  message: 'What time is the testing at?',
  label: 'app.js',
  timestamp: '2017-09-30T03:57:26.875Z' }
```

### Access logging for Express applications 

Optionally you can use the built-in Express access logger:

```javascript
const { Express } = require('@hmcts/nodejs-logging')

app.use(Express.accessLogger())
```

### Request tracing for Express applications

An Express middleware is provided which automatically populates request headers with request tracing IDs. Sample usage:

```javascript
const { RequestTracing } = require('@hmcts/nodejs-logging')

app.use(RequestTracing.middleware)
```

Assuming your Express application servers as the system's entry point which serves user UI, this middleware will intercept user requests and set `Root-Request-Id` and `Request-Id` headers on it. If the incoming request comes from a different service which already populated those values, they will be forwarded.

Apart from populating the headers, access to request tracing information is available at any point during request processing, e.g.:

```javascript
const id = RequestTracing.getCurrentRequestId()
```

We can also access the original request:

```javascript
const request = RequestTracing.retrieveInitialRequest()
```

These features are enabled by [continuation-local-storage module](https://github.com/othiym23/node-continuation-local-storage).

## Units Tests

Just do

```
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
