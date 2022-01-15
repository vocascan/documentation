# Docker

## Prerequisites

This guide assumes, that you already installed docker and docker-compose as it is described in the
[install server via docker guide](vocascan-server/installation/docker).

## 1. Adjust docker-compose.yml

Add the following service to your existing `docker-compose.yml` file.

```yml
  ...

  frontend:
    image: vocascan/frontend:latest
    restart: always
    tty: true
    environment:
      VOCASCAN_BASE_URL: "https://your-api-domain.com"
    ports:
      - "80:80"
```

## 2. Configure vocascan-frontend

To configure your vocascan-frontend to match for your needs you can use environment variables. You can use all
configuration options described in the [configuration](vocascan-frontend/configuration) page prefixed with `VOCASCAN_`.

If you host a vocascan-frontend web service, you may want to set the `BASE_URL` so that the frontend is directly
associated with the backend and the user has no possibility to change the server url as it can be done in the desktop
app. If you set the `BASE_URL`, you may already noticed, there is no selection screen anymore.

## 3. Start your container

To start your newly configured vocascan-frontend server just start with docker-compose again.

```bash
docker-compose up -d
```

Now your container should be running. If you encounter any errors look at the
[troubleshooting](vocascan-frontend/troubleshooting) guide.
