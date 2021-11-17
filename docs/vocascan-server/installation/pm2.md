# PM2

## 1. Install node, npm and git

```bash
sudo apt install nodejs npm git
```

Check if NodeJS version is at least v12.x.x

```bash
node -v
```

if not, you can install it via the
[NodeSource PPA](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

Retrieve installation script

```bash
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
```

execute the script

```bash
sudo bash nodesource_setup.sh
```

your local package cache will be updated and you can install NodeJS

```bash
sudo apt install nodejs
```

check the version again

```bash
node -v
```

## 2. Install pm2

```bash
npm i -g pm2
```

## 3. Install package

Install the vocascan server npm package globally.

```bash
sudo npm i -g @vocascan/server
```

?> If you want to have SQLite support, add the `--sqlite` flag

?> If you want to **update** your server to a newer version, just run this command again.

### Versions

There are different versions/tags published to the [npm registry](https://www.npmjs.com/). If you consider to install a
different version than `latest`, use the following command. (Replace `<version>` with the version/tag you want to use)

```bash
sudo npm i -g @vocascan/server@<version>
```

- `latest` - The latest stable version points to the latest `X.Y.Z` release. It is recommended for production use.
- `experimental` - The experimental version is partially stable and points to the latest `X.Y.Z-rc.A` released. If you
  consider to use that version, note, that it can container some problems.
- `X.Y.Z` - For each release, there is a specific version published.
- `X.Y.Z-rc.A` - For each beta release, there is a specific tag published. It could contain some problems.

!> Please notice, that **downgrading** is **not supported**. Make a backup before updating, in case there goes something
wrong. If you update to an `experimental` version, please also notice that you have to stay with that version until the
official version will be released.

## 4. Configure your server

Create a folder to hold your config file

```bash
mkdir vocascan-server && cd vocascan-server
```

Download the config file template `vocascan.config.example.js`

```bash
curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/vocascan.config.example.js" -o vocascan.config.js
```

Open config file and configure it for your needs

```bash
nano vocascan.config.js
```

Fill out the config file. `server.jwt_secret` and `database.*` needs to be changed. For more details about the
configuration, see [configuration](vocascan-server/configuration) page.

## 5. Start vocascan-server

```bash
pm2 start vocascan-server -- web
```

## 6. Enable pm2 startup on reboot

```bash
pm2 startup
```

For deeper options on pm2, check out their [documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).

## 7. Save process list

```bash
pm2 save
```

## 8. Create an admin user

```bash
vocascan-server admin user create -u admin -p my_admin_password -e admin -r admin
```

?> Info: To see every registered user, use this [command](vocascan-server/cli#list)

!> Please remember that the admin user you just created should not be used as a regular account. Please create another
one for your daily use. For this, you can either use the registration function in the desktop app or with the cli.

Your setup is now ready and you can start using your server.
