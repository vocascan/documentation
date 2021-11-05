# Installation

This guide will get you through the installation of your own vocascan-server installation.

Currently, we offer three ready-made solutions for setting up your Vocascan server

1. [PM2](#_1-pm2)
2. [Docker](#_2-docker)

## 1. PM2

1. Install node, npm and git

   ```bash
   sudo apt install nodejs npm git
   ```

2. Install pm2

   ```bash
   npm i -g pm2
   ```

3. Download the vocascan-server repository

   ```bash
   git clone https://github.com/vocascan/vocascan-server.git
   ```

4. Change directory

   ```bash
   cd vocascan-server
   ```

5. Install npm packages

   ```bash
   npm install
   ```

6. Configure your server.

   Copy the config file template `vocascan.config.example.js`

   ```bash
   cp vocascan.config.example.js vocascan.config.js
   ```

   Open .env file and fill in your details

   ```bash
   nano vocascan.config.js
   ```

   For more details about the configuration see [configuration](vocascan-server/configuration) page.

7. Start vocascan-server

   ```bash
   pm2 start server.js --name vocascan-server
   ```

8. Enable pm2 startup on reboot

   ```bash
   pm2 startup
   ```

   For deeper options on pm2, check out their
   [documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).

9. Save process list

   ```bash
   pm2 save
   ```

## 2. Docker

There are ready-to-use images for docker.

1. Install docker

   Since docker is not up to date in the official apt sources, we add the official docker sources to apt.

   ```bash
   sudo apt update
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
   sudo apt update
   apt-cache policy docker-ce
   sudo apt install docker-ce
   ```

2. Install docker-compose

   Download docker-compose binary

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

   Apply exec permissions

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. Download docker-compose.yml

   ```bash
   curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/docker-compose.yml" -o docker-compose.yml
   ```

4. Configure vocascan-server

   As described in the [configuration](vocascan-server/configuration) page, you can either use the config file directly
   or set the config via environment variables. In the server repository there are sample `docker-compose.yml`
   configuration files in separate [folders](https://github.com/vocascan/vocascan-server/tree/main/docker).

   ```bash
   nano docker-compose.yml
   ```

5. Start vocascan-server

   ```bash
   docker-compose up -d
   ```
