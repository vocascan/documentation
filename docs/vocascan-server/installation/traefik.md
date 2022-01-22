# Installation with Traefik

This guide will get you through the installation of your own vocascan-server paired with Traefik as a reverse proxy and
Let's Encrypt.

## 1. Install docker

First, you have to install Docker and Docker-Compose. To do this, have a look at point 1 and 2 of our
[guide](vocascan-server/installation/docker) in the general vocascan-server installation section.

## 2. Create password

After that, create a secure password hash for the Traefik monitoring website with `htpasswd`

```
docker run --rm --entrypoint htpasswd httpd:2 -Bbn admin your_password
```

The output will look something like this. Store it for the later configuration

```
admin:$apr1$ppHrFJc4$3/iv8jBNSDXlxiAuP1GDH1
```

## 3. Clone repo

Download the vocascan-server repository

```bash
git clone https://github.com/vocascan/vocascan-server.git
```

## 4. Copy config

Copy Traefik and Docker configs from cloned repo

copy Traefik folder in your current directory

```bash
cp -R vocascan-server/docker/traefik traefik
```

Change directory

```bash
cd traefik
```

## 5. Create certificate file

Create `acme.json` to store certificate information

```bash
touch acme.json
```

- make file only accessible by root

```bash
chmod 600 acme.json
```

## 6. Configure Vocascan-Server

Open `vocascan.config.js` to configure your server after your needs

```bash
nano vocascan.config.js
```

Fill out the config file. `server.jwt_secret` and `database.*` needs to be changed. For more details about the
configuration, see [configuration](vocascan-server/configuration) page.

?> For all available tags see the [versions section](vocascan-server/installation/docker#versions) in the docker
installation guide.

## 7. Configure traefik

Open `traefik.toml`

```bash
nano traefik.toml
```

and update the email prop to your email

```toml
                     ...
14    [certificatesResolvers.lets-encrypt.acme]
15       email = "your@mail.com"
16       storage = "acme.json"
                     ...
```

## 8. Configure Basic-auth

Open `traefik_dynamic.toml`

```bash
nano traefik_dynamic.toml
```

- Add the secret key (line 3), you created in the beginning (step 2)

```toml
1    [http.middlewares.simpleAuth.basicAuth]
2       users = [
3          "admin:secret_key"
4    ]
                     ...
```

- Update your domain (line 7)

```toml
                     ...
6    [http.routers.api]
7       rule = "Host(`monitor.your_domain.com`)"
                     ...
```

## 9. Configure Domain

Open `docker-compose.yml`

Remember to [configure](vocascan-server/configuration) the file after your needs:

```bash
nano docker-compose.yml
```

On top of that, replace this parts to your domain

```toml
                              ...
18   - "traefik.frontend.rule=Host:monitor.your_domain.com"
                              ...
33   - "traefik.http.routers.vocascan.rule=Host(`your_domain.com`) && PathPrefix(`/p/`, `/api`)"
                              ...
```

?> The `/p/` PathPrefix is for the [custom pages](vocascan-server/customPages).

## 10. Start server

Start you docker containers

```bash
docker-compose up -d
```

Your server should now be accessible at `web.your_domain.com`. In addition, a monitoring tool is available at
`monitor.your_domain.com`, which can be accessed with the login data you created at the beginning.

?> If you want to **update** your server to a newer version, pull the latest images (`docker-compose pull`) and then
restart the containers (`docker-compose up -d`).

The last thing you need to do is finish setting up your new Vocascan server. For this, you need to create an admin user.

## 11. Create session

Create a session in your running vocascan-server docker container

```bash
docker-compose exec vocascan ash
```

## 12. Create admin user

```
/app # node vocascan-server admin user create -u admin -p my_admin_password -e admin -r admin
```

leave the session with

```bash
exit
```

?> Info: To see every registered user, use this [command](vocascan-server/cli#list)

!> Please remember that the admin user you just created should not be used as a regular account. Please create another
one for your daily use. For this, you can either use the registration function in the desktop app or with the cli.

Your setup is now ready and you can start using your server.
