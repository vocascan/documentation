# Logging

It is possible to define different logger transports that deliver the logging entries.

- `console` - logs to the console
- `file` - logs into a file

In the log section of the config file, you can add a couple of loggers while giving them their own name. The following
config example represents three logger transports. Two named `myCustomLogger1`, `myCustomLogger2` and one named `file`.
As you might have already noticed, the logger called `file` has no `mode` property, because if the logger name is the
same as the transport mode, it automatically sticks to the name. In summary, if a logger is called `file`, the mode is
automatically set to `file`.

For all available options see the log section in the [configuration sheet](vocascan-server/configuration?id=log-log).

```js
module.exports = {
  log: {
    myCustomLogger1: {
      mode: "console", // shouldn't be necessary, because console is the default
      stderr_levels: ["error", "warn"],
      colorize: true,
      handle_exceptions: false,
    },
    myCustomLogger2: {
      enable: false,
      mode: "file",
      filename: "./logs/vocascan.log",
      enable_sql_log: true,
      enable_router_log: true,
      max_size: 100000,
      max_files: 3,
      archive_logs: true,
    },
    file: {
      enable: true,
      level: "debug",
      enable_router_log: true,
      stderr_levels: ['error'],
    },
  }
```

This configuration can also be archived by only using environment variables. In the following an example for
`myCustomLogger1`.

```bash
VOCASCAN__MYCUSTOMLOGGER1__MODE=console
VOCASCAN__MYCUSTOMLOGGER1__STDERR_LEVELS=error,warn
VOCASCAN__MYCUSTOMLOGGER1__COLORIZE=true
VOCASCAN__MYCUSTOMLOGGER1__HANDLE_EXCEPTIONS=false
```

## Default logger

By default the `console` logger with colorization is enabled. If you don't want to log to the console, you can disable
it via the `log.console.enable` option.

```env
VOCASCAN__LOG__CONSOLE__ENABLE=false
```

## Custom format

It is also possible to define custom formats for each logging group (`default`, `sql`, `router`). The formats are
defined with a template syntax. The javascript template syntax starts with two round brackets `{{` and ends with two
`}}`. Between the brackets, you can use any valid javascript. The context variables are available within the global
scope.

### Example

- **Default Group** - `{{level}}: {{message}}`
- **SQL Group** - `{{message}}`
- **Router Group** -
  `{{tokens.remoteAddr}} - "{{req.user ? req.user.username : "no user"}}" {{tokens.date("clf")}} "{{tokens.method}} {{tokens.url}}" {{tokens.colorizedStatus}} {{tokens.res("content-length")}} "{{tokens.userAgent}}" - {{tokens.responseTime(3)}}ms`

As you might have already noticed, it's possible to use javascript operations inside the template. This can be used to
check if a context variable is empty in order to display another string.

Logging dates will be as simple as this.

```js
{{new Date().toISOString()}} - {{level}}: {{message}}
```

### Context

Context describes the variables available from inside a template. There is a global context which is available to all
groups and a specific context for each logging group.

#### Global

- `chalk` - reference to the [chalk](https://www.npmjs.com/package/chalk) package to output colorized log messages

#### Default group

- `level` - log level
- `message` - log message
- any other keys that are available in the message object

#### SQL group

- `message` SQL query

#### Router group

- `req` access to the express request object (for more infos see
  [express req object](https://expressjs.com/en/5x/api.html#req))
- `res` access to the express response object (for more infos see
  [express res object](https://expressjs.com/en/5x/api.html#res))
- `tokens` morgan tokens. (for more infos see morgans documentation about the
  [tokens](https://www.npmjs.com/package/morgan#tokens)).

  - `url` - The URL of the request.
  - `method` - The http method used for the request.
  - `responseTime(digits=3)` - The time after a request comes in and the response headers are written.
  - `totalTime(digits=3)` - The total time after a request comes in and the response is sent.
  - `date(format)` - Current date. `format` could be `clf`, `iso` or `web`.
  - `status` - The status code of the response.
  - `colorizedStatus` - The colorized status code of the response.
  - `referrer` - The referrer header of the request.
  - `remoteAddr` - The remote address of the request.
  - `httpVersion` - The http version used for the request.
  - `userAgent` - The content of the userAgent header.
  - `req(header)` - Access the given `header` of the request.
  - `res(header)` - Access the given `header` of the response.
