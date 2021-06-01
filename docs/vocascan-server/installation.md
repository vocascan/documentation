# Installation

This guide will get you through the installation of your own Vocascan server.

There are two ways to set up the vocascan-server.

1. run with pm2
1. run in docker contianer

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

5. Configure your server.

   Copy the .env.example file

   ```bash
   cp .env.example .env
   ```

   Open .env file and fill in your details

   ```bash
   nano .env
   ```

   For more details about the environment variables see [configuration guide](configuration).

6. Start vocascan-server

   ```bash
   pm2 start server.js --name vocascan-server
   ```

7. Enable pm2 startup on reboot

   ```bash
   pm2 startup
   ```

   For deeper options on pm2, check out their
   [documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).

8. Save process list

   ```bash
   pm2 save
   ```

## 2. docker

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

   ```bash
   nano docker-compose.yml
   ```

   For details about the environment variables see [configuration guide](./Configuration).

5. Start vocascan-server

   ```bash
   docker-compose up -d
   ```
