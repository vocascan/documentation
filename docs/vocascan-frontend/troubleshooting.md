# Troubleshooting

## Cannot Log in/Register

If you cannot log in or register can be caused by multiple factors.

### Cors

If you try to connect your frontend to your server and they don't share the same domain, you can get CORS errors. To
check that, open the console and look for such errors:

![cors Error](../_media/images/cors-error.png)

To fix that, add the CORS option (`server.cors`) to your server configuration. E.g.:

```js
module.exports = {
  // ...
  server: {
    cors: "myfrontend.de",
  },
};
```

!> Setting CORS to `*` is highly not recommended

### Wrong BASE_URL

If you don't see any CORS errors, but a double `/api` in your requests, you set the wrong base URL. The base URL should
be without an ending `/` and without `/api`.

![baseURL Error](../_media/images/base-url-error.png)
