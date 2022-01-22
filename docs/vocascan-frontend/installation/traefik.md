# Traefik

## Prerequisites

This guide assumes, that you already installed docker and docker-compose as it is described in the
[install server via docker guide](vocascan-server/installation/docker).

## 1. Adjust docker-compose.yml

Add the following service to your existing `docker-compose.yml` file and update the domains to your existing one.

?> This step assumes, that you already have a running Traefik reverse proxy, with all it's config and Docker-Compose
files, running, to just add the next config snippet. If you need a tutorial on how to do this, follow our
["how to set up vocascan-server with Traefik"](vocascan-server/installation/traefik) Tutorial (if you don't need the
server part, just delete it).

```yml
---
frontend:
  image: vocascan/frontend:latest
  restart: always
  tty: true
  environment:
    VOCASCAN_BASE_URL: "https://your-api-domain.com"
  labels:
    - "traefik.http.routers.frontend.rule=Host(`your-domain.com`)"
    - "traefik.http.routers.frontend.tls=true"
    - "traefik.http.routers.frontend.tls.certresolver=lets-encrypt"
    - "traefik.http.services.frontend.loadbalancer.server.port=80"
  networks:
    - web
```

## 2. Configure vocascan-frontend

To configure your vocascan-frontend to match for your needs, you can use environment variables. You can use all
configuration options described in the [configuration](vocascan-frontend/configuration) page prefixed with `VOCASCAN_`.

If you host a vocascan-frontend web service, you may want to set the `BASE_URL` so that the frontend is directly
associated with the backend and the user has no possibility to change the server URL as it can be done in the desktop
app. If you set the `BASE_URL`, you may have already noticed, there is no selection screen anymore.

## 3. Start your container

To start your newly configured vocascan-frontend server, just start with docker-compose again.

```bash
docker-compose up -d
```

Now your container should be up and running. If you encounter any errors, look at the
[troubleshooting](vocascan-frontend/troubleshooting) guide.
