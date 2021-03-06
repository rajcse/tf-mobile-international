# TruthFinder Mobile App

Built with Cordova and React

## Prerequisites

### Java Development Kit 8
In order to build for Android you will need the latest versions of Java Development Kit installed. Download a copy for your specific machine here: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html.

### Android SDK
To stay most current and avoid build conflicts, it's recommended to use the official Android Studio install to get Android SDKs and tools on your computer: https://developer.android.com/studio/install.html

Now run `~/Library/Android/sdk/tools/android` to open the Android SDK Manager. You will need to install:
- The highest 'Android SDK Build-tools' version listed
- `Android 6.0 (API 23)` - only the `SDK Platform` is required
- Under "Extras", the `Android Support Repository`
- Under "Extras", the `Google Repository`

### Chrome Web Inspector
Application Logs from any developer enabled, connected Android device are available natively in Chrome by going to [chrome://inspect](chrome://inspect). Use these to debug on a device locally, and for all preliminary QA.

### ADB Logs and Other Tools
Get live logs from your Android device in console while testing and debugging while your phone is connected via usb. Platform tools can be installed from the Android SDK Manager. In terminal, navigate to `~/Library/Android/sdk/platform-tools`.

Usage: `./adb logcat`

### Yarn
Install all project dependencies quickly. This works the same way as `npm install`, but also generates a `yarn.lock` file to guarantee that every dependency tree is built identically and deterministically. This should always be committed to Git. If you change any of the packages in `package.json`, you'll notice the `yarn.lock` will also have updates.

Check out the [docs](https://yarnpkg.com/) for more info.

Install: `npm i -g yarn`

Usage (Install dependencies): `yarn`

Usage (Add dependencies): `yarn add --dev [package-name]`

### Cordova
This is necessary to do all builds. https://cordova.apache.org

Install: `npm i -g cordova`

## Development Environments
This is app is designed to be tested on a wide range of devices and as such we have written a few short commands to help get you there.

Before you start any form of development be sure to install all project dependencies using yarn.

`yarn`

### Developing in the Browser ( Safari or Chrome only for now )
This stack uses `webpack-dev-server` to bundle and serve all project assets.

Start Server (Local API): `yarn start`
Start Server (Production API): `yarn start:prod`

This command checks the config file for environment variables, such as development vs production API endpoint, and starts a webpack server. Once the server has started visit `http://localhost:3000` from your preferred browser to view the app. Any changes made to the app while this command is running will trigger a 'rebundle' with webpack and update the app accordingly. If you wish to quit developing in the browser you may close webpack at anytime using the `CTRL + C` command in the same terminal window.

For development using the production config, you will need run `window.device = {}` and `window.initializeApp()` from your console to initialize the app. The app self-initializes when using the development config.

### Testing / Debugging on Mobile Devices ( Android or iOS )
Before deploying to a device, we need to build the right files for each platform.

#### Prepare Platforms and Plugins
If your project folder does not have any reference to 'plugins' or 'platforms' you will need to run this command first to generate the proper platforms and download the correct plugins. Once this is run, you generally will never have to run it again.

Usage: `cordova prepare`

#### Build apk / iOS (Development Only)
Depending on the device you wish to test you may run one of the corresponding commands below. This step requires an actual device plugged into your machine. Android will attempt to deploy directly to the device, iOS will open Xcode and the generated project to continue manually from there. It will build a production bundle of the React app, then do a platform build for Cordova.

Android Devices: `yarn android`

iOS Devices: `yarn ios`


## Releases
All builds must be tested thoroughly locally, and pass QA on a real device locally before moving to production channels (Alpha/Beta/Production). If any particular version requires more than a couple builds on production channels then local QA should be tighter.

### Versioning
The version of the app is saved in the `config.xml`. Do not modify this directly. The app uses Semantic Versioning (http://semver.org), and the build versions are calculated automatically from this. Run `yarn set-version -- X.X.X` to set a new version in `config.xml`. This will also create a build number for that version set to `1`. Subsequent builds sent to production channels must be manually set via the `-b n` flag (ex. `yarn set-version -- 1.1.0 -b 2`).


### Device Release
Once you have a working release key it's time to build your release apk and xcode project. Once complete, the Android apk will be found at `platforms/android/build/outputs/apk/android.apk`, and xcode should have opened automatically (the iOS project can be found at `platforms/ios/TruthFinder.xcodeproj`).

Usage: `yarn release`
