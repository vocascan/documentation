## 2. Docker

There are ready-to-use images for docker.

1. Install docker

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

2. Install docker-compose

   Download docker-compose binary

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

   Apply exec permissions

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. Configure vocascan-server

   In the server repository there are sample `docker-compose.yml`
   configuration files in separate [folders](https://github.com/vocascan/vocascan-server/tree/main/docker).
   As described in the [configuration](vocascan-server/configuration) page: 

   3.1 You can either use the config file directly: 
      
   download vocascan.config.js (to use a fully extended config, have a look at this [config file]("https://raw.githubusercontent.com/vocascan/vocascan-server/main/vocascan.config.example.js"))
   ```bash
   curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/default/vocascan.config.js" -o vocascan.config.js
   ```
   download docker-compose file
   ```bash
   curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/default/docker-compose.yml" -o docker-compose.yml
   ```

   Remember to [configure](vocascan-server/configuration) the files after your needs:

   ```bash
   nano docker-compose.yml
   ```

   ```bash
   nano vocascan.config.js
   ```

   ---
   3.2 or set the config via environment variables:

   download docker-compose file
   ```bash
   curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/docker/use-env/docker-compose.yml" -o docker-compose.yml
   ```

   Remember to [configure](vocascan-server/configuration) the file after you needs:

      ```bash
      nano docker-compose.yml
      ```

4. Start vocascan-server

   ```bash
   docker-compose up -d
   ```

   The last thing you need to do is finish setting up your new Vocascan server. For this you need to create an admin user.

5. Create a session in your running vocascan-server docker container  

   Create a session for the vocascan Docker container
   ```bash
   docker-compose exec vocascan ash
   ```

6. Create an admin user

   ```
   /app # node vocascan-server admin user create -u admin -p my_admin_password -e admin -r admin
   ```
   
   leave the session with
   ```bash
   exit
   ```
   ?> Info: To see every registered user use this [command]("vocascan-server/cli#list")
   
   Your setup is now ready and you can start using your server. Please remember that the admin user you just created should not be used as a regular account. Please create another one for your daily use.
