# Run programmatically

We also provide a way to integrate the vocascan-server directly into your nodeJS application. This could be useful if
you want to run vocascan-server from inside of your electron client.

## 1. Install via npm

We publish packages to [npm](https://npmjs.com/package/@vocascan/server) and
[GitHub Package Registry](https://github.com/vocascan/vocascan-server/packages/1077993).

```bash
npm i @vocascan/server
```

## 2. Run

You can then import the `@vocascan/server` package and run the server. The first argument is an object containing your
config described in [configuration](/vocascan-server/configuration). This function returns an Promise that resolves with
a started `http` server object, so its also possible to stop that server afterwards or extend it with other middlewares
or request handlers.

This example will start a vocascan-server on port `8989` with an inmemory sqlite database and an colorized console sql
logger. After 2s the server stops automatically.

```js
const runServer = require("@vocascan/server");

(async () => {
  const server = await runServer({
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

  setTimeout(() => {
    server.close();
  }, 2000);
})();
```
