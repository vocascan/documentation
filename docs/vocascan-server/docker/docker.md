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
