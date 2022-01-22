# Configuration

You can configure vocascan-frontend with the following options. For a instruction how to use them look at the individual
[installation guides](vocascan-frontend/installation/installation.md).

| Name         | Default                     | Description                                                                                                                                                   |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENV`        | _automatically detected_    | Determinate the environment type for clipboard implementation, update notification handler, ... Possible values are `web` and `electron`                      |
| `BASE_URL`   | _empty string_              | Set the default baseurl for the API server. Keep empty, if you want to give the user the option to select a custom API Server. E.g. `https://api.example.com` |
| `SHOW_PLANS` | `true` if `BASE_URL` is set | Show select plans page                                                                                                                                        |
