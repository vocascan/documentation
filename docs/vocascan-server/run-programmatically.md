# Run programmatically

We also provide a way to integrate the vocascan-server directly into your NodeJS application. This could be useful if
you want to run vocascan-server within of your electron client.

## Install via npm

We publish packages to [npm](https://npmjs.com/package/@vocascan/server) and
[GitHub Package Registry](https://github.com/vocascan/vocascan-server/packages/1077993).

```bash
npm i @vocascan/server
```

## Create and start server

Import the `@vocascan/server` package, create and start the server. The first argument is an object containing your
config described in [configuration](vocascan-server/configuration). This function returns a Promise that resolves with
the server object created previously. With that system it's also possible to stop that server afterwards or run the
migrations manually.

This example creates and starts a vocascan-server on port `8989` with an in-memory sqlite database, a colorized console
sql logger and a new route `/hello-world`. After two seconds the server stops immediately.

```js
const { createServer, version } = require("@vocascan/server");

(async () => {
  console.log(`Server version: ${version}`);

  const server = await createServer({
    server: {
      port: 8989,
      jwt_secret: "123",
    },
    database: {
      dialect: "sqlite",
      storage: ":memory:",
    },
    log: {
      console: {
        colorize: true,
        enable_sql_log: true,
      },
    },
  });

  await server.start();

  setTimeout(() => {
    server.stop();
  }, 2000);
})();
```

## API

The `@vocascan/server` package exports two things, `createServer` and `version`.

### createServer

This creates a server object with the following contents.

**Arguments:**

| key      | description                                                                         |
| -------- | ----------------------------------------------------------------------------------- |
| `config` | Configuration object, see the [configuration](vocascan-server/configuration) guide. |

**Returns Promise\<object\>:**

| key                                        | description                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `start({ migrate = true }): Promise<void>` | Starts the server.                                                                                      |
| `stop(): Promise<void>`                    | Stops the server.                                                                                       |
| `migrate(): Promise<void>`                 | Migrates the database if needed.                                                                        |
| `app`                                      | The [express](https://expressjs.com/en/4x/api.html#app) instance                                        |
| `http`                                     | The [http server](https://nodejs.org/api/http.html#class-httpserver) instance                           |
| `db`                                       | The [database](https://github.com/vocascan/vocascan-server/blob/main/database/index.js) instance        |
| `logger`                                   | The [logger](https://github.com/vocascan/vocascan-server/blob/main/app/config/logger/index.js) instance |
| `config`                                   | The accumulated config used to run the vocascan server                                                  |

### version

This export holds the server version, defined in the package.json file of `@vocascan/server` (e.g. `"1.1.0"`).
