# Installation

This guide will get you through the installation of your own vocascan-desktop installation.

There are three ways to install vocascan-desktop.

1. [Installer](#_1-installer)
2. [Snap store](#_2-snap-store)
3. [Build Vocascan yourself](#_3-build-vocascan-yourself)

## 1. Installer

1. goto the vocascan-desktop [release page](https://github.com/vocascan/vocascan-desktop/releases)
2. download the latest release for your platform
3. install vocascan-desktop
4. open vocascan-desktop

!> On **Windows**, you may need to confirm to trust the app when you open the app for the first time.

!> On **macOS**, you may need to adjust your security settings to open the app. You can do so following the
[apple support guide](https://support.apple.com/guide/mac-help/mh40616/mac)

5. login to your server

## 2. Snap store

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/vocascan-desktop)

On Ubuntu systems, snap is preinstalled. So you are able to use the Ubuntu software manager.

1. Install snap

   ```bash
   sudo apt install snapd
   ```

2. Install Vocascan snap

   ```bash
   sudo snap install vocascan-desktop
   ```

   Vocascan should be installed on your PC now

## 3. Build Vocascan yourself

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

5. Start Vocascan

   - For testing you can run Vocascan via the command line:

   ```bash
   npm run start
   ```

   - But if you want to build it, to get a finished installer, AppImage, etc. you can use this:

   ```bash
   npm run build
   ```

   This command will create you installers and executables depending on which OS you are using.
