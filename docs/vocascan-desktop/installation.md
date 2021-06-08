# Installation

## Installer
1. goto the vocascan-desktop [release page](https://github.com/vocascan/vocascan-desktop/releases)
2. download the latest release for your platform
3. install vocascan-desktop
4. login to your server

## Build Vocascan yourself
1. Install node, npm and git
   ```bash
   sudo apt install nodejs npm git
   ```
   
2. Download the vocascan-desktop repository

   ```bash
   git clone https://github.com/vocascan/vocascan-desktop.git
   ```
   
3. Change directory

   ```bash
   cd vocascan-desktop
   ```
   
4. Install npm packages

   ```bash
   npm install
   ```
   
For testing you can run Vocascan via the command line:

5. Start Vocascan

   ```bash
   npm run start
   ```
   
But if you want to build it, to get a finished installer, AppImage, etc you can use this:

6. Build Vocascan

   ```bash
   npm run build
   ```
