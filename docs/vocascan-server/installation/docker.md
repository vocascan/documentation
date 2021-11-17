# Docker

There are ready-to-use images for docker.

## 1. Install docker

Since docker is not up-to-date in the official apt sources, we add the official docker sources to apt.

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
```

If you want to make things more simple, you can use the command from the GetDocker Guide

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## 2. Install docker-compose

Download docker-compose binary

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Apply exec permissions

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

## 3. Configure vocascan-server

In the server repository, there are sample `docker-compose.yml` configuration files in separate
[folders](https://github.com/vocascan/vocascan-server/tree/main/docker). As described in the
[configuration](vocascan-server/configuration) page:

3.1 You can either use the config file directly:

download vocascan.config.js (to use a fully extended config, have a look at this
[config file](https://raw.githubusercontent.com/vocascan/vocascan-server/main/vocascan.config.example.js))

```bash
curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/default/vocascan.config.js" -o vocascan.config.js
```

download docker-compose file

```bash
curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/default/docker-compose.yml" -o docker-compose.yml
```

Remember to [configure](vocascan-server/configuration) the files after you needs.

`VOCASCAN_CONFIG` has to be set to your config file path

```bash
nano docker-compose.yml
```

`server.jwt_secret` and `database.*` needs to be changed. For more details about the configuration see
[configuration](vocascan-server/configuration) page.

```bash
nano vocascan.config.js
```

---

3.2 or set the config via environment variables:

download docker-compose file

```bash
curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/use-env/docker-compose.yml" -o docker-compose.yml
```

Remember to [configure](vocascan-server/configuration) the file after you needs. `VOCASCAN__SERVER__JWT_SECRET` and
`VOCASCAN__DATABASE__*` needs to be changed. For more details about the configuration see
[configuration](vocascan-server/configuration) page.

```bash
nano docker-compose.yml
```

### Versions

There are different versions/tags published to the [docker registry](https://hub.docker.com/). If you consider to
install a different version than `latest`, change it in the `docker-compose.yml` file. (Replace `<version>` with the
version/tag you want to use)

```yml
image: vocascan/server:<version>
```

- `latest` - The latest stable version points to the latest `X.Y.Z` release. It is recommended for production use.
- `experimental` - The experimental version is partially stable and points to the latest `X.Y.Z-rc.A` released. If you
  consider to use that version, note, that it can container some problems.
- `X` - Points to the latest release with the same major version.
- `X.Y` - Points to the latest release with the same major and minor version.
- `X.Y.Z` - Points to the latest release with the same major, minor and patch version.
- `X.Y.Z-rc.A` - For each beta release, there is a specific tag published. It could contain some problems.
- `[branch-name]` - Sometimes a branch needs some additional testing. If you want to test a specific branch and dont
  want to build/checkout that locally, feel free contact a maintainer to get a pre-build docker image of that specific
  branch.

!> Please notice, that **downgrading** is **not supported**. Make a backup before updating, in case there goes something
wrong. If you update to an `experimental` version, please also notice that you have to stay with that version until the
official version will be released.

## 4. Start vocascan-server

```bash
docker-compose up -d
```

?> If you want to **update** your server to a newer version, pull the latest images (`docker-compose pull`) and then
restart the containers (`docker-compose up -d`).

The last thing you need to do is finish setting up your new Vocascan server. For this, you need to create an admin user.

## 5. Create session

Create a session in your running vocascan-server docker container

```bash
docker-compose exec vocascan ash
```

## 6. Create an admin user

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
