# TruthFinder Mobile App

Built with PhoneGap and React

## Prerequisites

### Java Development Kit 8
In order to build for android you will need the latest versions of Java Development Kit installed. Download a copy for your specific machine here: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html.

### Android SDK
If you haven't already found a good reason to use [brew](http://brew.sh/), this should be it. Install a fresh version of Android SDK Manager using homebrew. This is necessary to build an android apk on your system.

Install: `brew install android-sdk`

Usage: `android`

Once the installation is complete, kindly follow the installation instructions to make sure android sdk is added to your system. If you feel confident that your system is ready to build android, try opening a new tab in terminal and running `android`.

If successful your Android SDK Manager will open.

For these current builds of Android we are running on version '5.1.1' and will require all relating Build-tools under "Tools" with revision 24.*.*

![](https://dl.dropboxusercontent.com/u/12648103/Screen%20Shot%202016-11-02%20at%205.13.50%20PM.png)

### ADB Logs and Other Tools
Get live logs from your Android device in console while testing and debugging while your phone is connected via usb.

Install: `brew install android-platform-tools`

Usage: `adb logcat | grep -i chromium`

This gets all the logs from the devices chrome window - look out for react and api specific errors here.

### Yarn
Install all project dependencies quickly. This works the same way as `npm install`

Check out the [docs](https://yarnpkg.com/) and give it a try for yourself.

Install: `npm i -g yarn`

Usage (Install dependencies): `yarn install`

Usage (Add dependencies): `yarn add --dev package-name`

## Development Environments
This is app is designed to be tested on a wide range of devices and as such we have written a few short commands to help get you there.

Before you start any form of development be sure to install all project dependencies using yarn.

`yarn install`

### Developing in the Browser ( Safari or Chrome only for now )
This stack uses 'webpack-dev-server' to bundle and serve all project assets.

Start Server (Development): `npm run start`
Start Server (Production): `npm run start:prod`

This command checks the config file for environment variables, such as development vs production build, and starts a webpack server. Once the server has started visit `http://localhost:3000` from your preferred browser to view the app. Any changes made to the app while this command is running will trigger a 'rebundle' with webpack and update the app accordingly. If you wish to quit developing in the browser you may close webpack at anytime using the `CTRL + C` command in the same terminal window.

In order for the app to initialize in your browser, you will need run `window.device` and `window.initializeApp()` from your console. Webpack will attempt to add these commands on browser environments. Kindly note that when developing in the browser with mobile views enabled, this will "trick" the app into thinking it is on a mobile device and may not work as intended - therefore always make sure that you are viewing the app in a browser environment.

![](https://dl.dropboxusercontent.com/u/12648103/mac-phone.png)

### Testing / Debugging on Mobile Devices ( Android or iOS )
Before any testing can begin we will need to prepare, compile and build the right files for each platform.

![](https://dl.dropboxusercontent.com/u/12648103/process.png)

> All the commands below are based on Cordova and have been adjusted to fit the needs of this project and will work for any device.

1. Prepare (creates all the necessary files and checks for any errors)
2. Compile (builds the platforms based on app)
3. Testing / Debugging

#### Prepare Platforms and Plugins
This is the planning stage of the app, plugin checks and platform support is checked and generated here. If your project folder does not have any reference to 'plugins' or 'platforms' you will need to run this command.

Usage: `npm run prepare`

#### Compile Assets
This puts all the right files in the right places. Any changes made to index.html or the app will go into the final build of the app.

If you are testing / debugging on a mobile device you will need to run this command again so that changes will be visible in the app.

Usage: `npm run compile`

#### Build APK / iOS (Development Only)
Depending on the device you wish to test you may run one of the corresponding commands below. If you have no testing devices connected to your system this will build emulator on your machine. Otherwise you may plug in any device and build directly to that device for testing.

Android Devices: `npm run android`

iOS Devices: `npm run ios`


## Android Production Builds
Android devices require a bit of elbow grease before you may add a new release to the app store. Luckily we have a few commands that will make this an ease for you. The 2 most important things to do before you build for production on android is generate a release key and a release apk.

### Android Version Number
The version number of the app is saved in the package.json under `android:build` script. If your version number is below the version necessary to build then you should update the number there.

### Android Release APK
Once you have a working release key it's time to build your release apk. This process will also ask for a password which is the same as the one used for your release key. Once complete, take note of where the release apk is built to and upload to the play store.

Usage: `npm run android:build`
