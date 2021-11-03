# Installation with Traefik

This guide will get you through the installation of your own vocascan-server paired with Traefik as a reverse proxy and
Let's Encrypt.

1. First of all you have to install Docker an Docker-Compose. To do this have a look at point 1 and 2 our
   [guide](vocascan-server/installation#_2-Docker) in the general vocascan-server installation section.

2. After that install `apache2-utils` to create a secure password hash for the Traefik monitoring website with
   `htpasswd`

   ```bash
   sudo apt-get install apache2-utils
   ```

   Create password hash

   ```bash
   htpasswd -nb admin my_secure_password
   ```

   The output will look something like this. Store it for the configuration later

   ```
   admin:$apr1$ppHrFJc4$3/iv8jBNSDXlxiAuP1GDH1
   ```

3. Download the vocascan-server repository

   ```bash
   git clone https://github.com/vocascan/vocascan-server.git
   ```

4. Copy Traefik and Docker configs from cloned repo

   copy Traefik folder in you current directory

   ```bash
   cp -R vocascan-server/docker/traefik traefik
   ```

   Change directory

   ```bash
   cd traefik
   ```

5. Create `acme.json` to store certificate information

   ```bash
   touch acme.json
   ```

   - give root access to file

   ```bash
   chmod 600 acme.json
   ```

6. Open `vocascan.config.js` to configure you server

   ```bash
   nano vocascan.config.js
   ```

   For more details about the configuration see [configuration](vocascan-server/configuration) page.

7. Open `traefik.toml`

   ```bash
   nano traefik.toml
   ```

   and update the email prop to you email

   ```toml
                        ...
   14    [certificatesResolvers.lets-encrypt.acme]
   15       email = "your@mail.com"
   16       storage = "acme.json"
                        ...
   ```

8. Open `traefik_dynamic.toml`

   ```bash
   nano traefik.toml
   ```

   - Add the secret key (line 3), you created in the beginning

   ```toml
   1    [http.middlewares.simpleAuth.basicAuth]
   2       users = [
   3          "admin:secret_key"
   4    ]
   ```

   - Update your your domain (line 7)

   ````toml
   6    [http.routers.api]
   7       rule = "Host(`monitor.your_domain.com`)"
   ```

   ````

9. Open `docker-compose.yml`

   ```bash
   nano docker-compose.yml
   ```

update your environment variables and replace your domain

   ```yml
                                    ...    
      18   - "traefik.frontend.rule=Host:monitor.your_domain.com" 
                                    ... 
      33   - "traefik.http.routers.vocascan.rule=Host(`web.your_domain.com`)"
   ```

10. Start you docker containers

   ```bash
   sudo docker-compose up -d
   ```

Your server should now be accessible at `web.vocascan.com`. In addition, a monitoring tool is available at
`monitor.vocascan.com`, which can be accessed with the login data you created at the beginning.

The last thing you need to do is finish setting up your new Vocascan server. For this you need to create an admin user.

11. Create a session in your running vocascan-server docker container

   ```bash
   docker ps -a
   ```

   The output will look something like this. We just need the container id
   ```
   ~# docker ps
   CONTAINER ID   IMAGE                                
   b8c849fc3084   vocascan/vocascan-server:experimental   
   4dc1d76f3782   traefik:v2.2                          
   42a7b0cd9fcf   postgres  
   ```      

   Take the container id from the Vocascan server and create a session
   ```bash
   docker exec -it b8c849fc3084 ash
   ```

12. Create an admin user

   ```bash
   /app # node vocascan-server admin user create -u admin -p my_admin_password -e admin -r admin
   ```
   
   leave the session with
   ```bash
   exit
   ```

   Your setup is now ready and you can start using your server
