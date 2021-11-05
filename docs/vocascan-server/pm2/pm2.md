## 1. PM2

1. Install node, npm and git

   ```bash
   sudo apt install nodejs npm git
   ```

   Check if nodejs version is at least v14.x.x
   
   ```bash
   node -v
   ```

   if not, you can install it via the [NodeSource PPA]("https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04")
   
   Retrieve installation script

   ```bash
   cd ~
   curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
   ```

   execute the script
   ```bash
   sudo bash nodesource_setup.sh
   ```

   your local package cache will be updated and you can install nodejs

   ```bash
   sudo apt install nodejs
   ```

   check the version again

   ```bash
   node -v
   ```

2. Install pm2

   ```bash
   npm i -g pm2
   ```

3. install the vocascan server npm package globally

   ```bash
   sudo npm i -g @vocascan/server
   ```

   ?> If you want to have Sqlite support, add the `--sqlite` flag

4. Configure your server.

   create a folder to hold your config file
   
   ```bash
   mkdir vocascan-server && cd vocascan-server
   ```

   Download th config file template `vocascan.config.example.js`

   ```bash
   curl "https://raw.githubusercontent.com/vocascan/vocascan-server/main/vocascan.config.example.js" -o vocascan.config.js
   ```

   Open config file and fill in your details

   ```bash
   nano vocascan.config.js
   ```

   For more details about the configuration see [configuration](vocascan-server/configuration) page.

5. Start vocascan-server

   ```bash
   pm2 start vocascan-server -- web "vocascan-server"
   ```

6. Enable pm2 startup on reboot

   ```bash
   pm2 startup
   ```

   For deeper options on pm2, check out their
   [documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).

7. Save process list

   ```bash
   pm2 save
   ```
