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

   Open config file and fill in your details

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
