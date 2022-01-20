# Configuration

There are 2 ways to configure a vocascan-server.

- **1. Config File**: You can add an environment variable called `VOCASCAN_CONFIG` to set the path to your config file.
  The file could either be a json or a js file (any file which is importable with `require()`). If `VOCASCAN_CONFIG` is
  not set, vocascan searches for a file called `vocascan.config.js` or `vocascan.config.json` in the vocascan root
  directory.

- **2. Environment variables**: Another way is setting the config file options via environment variables. Vocascan
  parses all env variables starting with `VOCASCAN__`. To achieve this, place two underscores while replicating the
  paths in the config file. The following example shows the config file converted into the environment variables way.

  ```js
  module.exports = {
    debug: false,

    server: {
      port: 5000,
      jwt_secret: "abc",
      salt_rounds: 10,
      cors: ["https://web.example1.com", "https://web.example2.com"],
    },
  };
  ```

  ```bash
  VOCASCAN__DEBUG=false
  VOCASCAN__SERVER__PORT=5000
  VOCASCAN__SERVER__JWT_SECRET=abc
  VOCASCAN__SERVER__SALT_ROUNDS=10
  VOCASCAN__SERVER__CORS_1=https://web.example1.com
  VOCASCAN__SERVER__CORS_2=https://web.example2.com
  ```

!> **Note:** You need to restart the server to make the changes effective.

## Overall

| Name    | Default | Description                                                                                             |
| ------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `debug` | `false` | Enables development mode, so stack traces are also sent to the client. Never enable this in production. |

## Server (`server`)

| Name                  | Default | Description                                                                                                                                                                                                         |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `port`                | `5000`  | Defines the port on which the server is listening.                                                                                                                                                                  |
| `jwt_secret`          |         | Secret is used to sign the payload of the jwt token, change this to a unique string. Everyone who knows that secret is able to act as other vocascan users.                                                         |
| `salt_rounds`         | `10`    | The salt rounds define the coast efficiency factor to hash passwords with bcrypt. For more info, see [bcrypts documentation](https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds).                          |
| `registration_locked` | `false` | Locks the server and only allows registrations with an invite code.                                                                                                                                                 |
| `cors`                | `false` | This can be either a boolean (`true`/`false`), a string with a single domain (`http://localhost:3000`) or a asterisk (`*`) to allow all domains, or a array (`["http://localhost:3000", "http://localhost:4000"]`). |

## Database (`database`)

| Name             | Default | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `connection_url` |         | To connect to the database, you can either use a connection url, or set the other config options individually |
| `dialect`        |         | DB dialect. Currently, only `mysql`, `mariadb`, `postgres` and `sqlite` are supported.                        |
| `storage`        |         | SQL file. Only valid if dialect is `sqlite`.                                                                  |
| `host`           |         | Database host                                                                                                 |
| `port`           |         | Database port                                                                                                 |
| `username`       |         | Database username                                                                                             |
| `password`       |         | Database password                                                                                             |
| `database`       |         | Database name                                                                                                 |

## Log (`log`)

For more information about the logger section see [logging guide](vocascan-server/logging).

| Name      | Default | Description                                                                            |
| --------- | ------- | -------------------------------------------------------------------------------------- |
| `console` |         | Sublogger where `mode: "console"` is already set.                                      |
| `file`    |         | Sublogger where `mode: "file"` is already set.                                         |
| `*`       |         | Define custom sublogger transports. (`*` could be any name for that individual logger) |

### Any transport (`log.*`)

| Name                 | Default   | Description                                                                                                                                                         |
| -------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable`             | `true`    | Enables/Disable the logger. It is useful to disable the by default enabled `console` logger.                                                                        |
| `mode`               | `console` | Define logging transport. Available transports are `console` and `file`.                                                                                            |
| `level`              | `info`    | Specifies from which log level the logging entries are to be logged with this logger. Available levels are `silly`, `debug`, `verbose`, `info`, `warn` and `error`. |
| `colorize`           | `true`    | Colorize the logging output with ANSI escape sequences.                                                                                                             |
| `enable_default_log` | `true`    | Enables default logging.                                                                                                                                            |
| `enable_sql_log`     | `false`   | Enables logging for sql queries. logging.                                                                                                                           |
| `enable_router_log`  | `false`   | Enable logging for router requests.                                                                                                                                 |
| `format_default`     |           | Define custom format for default logging.                                                                                                                           |
| `format_sql`         |           | Define custom format for sql logging.                                                                                                                               |
| `format_router`      |           | Define custom format for router logging.                                                                                                                            |
| `json`               | `false`   | Log in JSON format.                                                                                                                                                 |
| `handle_exceptions`  | `true`    | Catch uncaught exceptions with that logger.                                                                                                                         |
| `handle_rejections`  | `true`    | Catch promise rejections with that logger.                                                                                                                          |

### Console transport (`log.console`, `mode: "console"`)

| Name            | Default | Description                                          |
| --------------- | ------- | ---------------------------------------------------- |
| `stderr_levels` |         | Defines which levels are logged to the stderr stream |

### File transport (`log.file`, `mode: "file"`)

| Name           | Default | Description                                                                                                                            |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `filename`     |         | The filename of the log file to write output to.                                                                                       |
| `max_size`     |         | Max size in bytes of the log file, if the size is exceeded then a new file is created, a counter will become a suffix of the log file. |
| `max_files`    |         | Limit the number of files created when the size of the log file is exceeded.                                                           |
| `archive_logs` |         | If true, all log files, but the current one will be packed into a zip archive.                                                         |

## Custom Pages (`pages.*`)

| Name       | Default | Description                                                                                                                                                                                                                                             |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`      |         | The route on which your page will be displayed relative to `/`                                                                                                                                                                                          |
| `fallback` |         | Defines a fallback page, if neither a language is specified per query parameter (`?lang=`), nor the queried language exists. You can either set a static page or a redirect to one of the defined languages (recommended if you use multiple languages) |
| `type`     |         | Defines whether the server renders a static page or just redirects to another. Options: `file` or `redirect`                                                                                                                                            |
| `location` |         | Either the path to your html file, or an internet address for the redirect                                                                                                                                                                              |
| `langs`    |         | Option to define multiple languages for your static file or redirect. Add props, named after the country code (ISO-639-1: Germany -> de), which include a `type` and a `location`                                                                       |

## API (`api`)

| Name             | Default | Description                                   |
| ---------------- | ------- | --------------------------------------------- |
| `enable_swagger` | `true`  | Enables serving of the swagger documentation. |
