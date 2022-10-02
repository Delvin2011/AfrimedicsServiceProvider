# Medical Service Provider Demo App

The demo application that uses `react-native-voximplant` and [Voximplant cloud platform](http://voximplant.com) for making/receiving audio/video calls.

## Getting started

To get started, you'll need to [register](https://manage.voximplant.com/auth/sign_up) a free Voximplant developer account.

You'll need the following:

- Voximplant application
- two Voximplant users
- VoxEngine scenario
- routing setup
- push certificates:
  - ios: VoIP services certificate. Follow [this tutorial](https://voximplant.com/docs/introduction/integration/adding_sdks/push_notifications/ios_sdk) to upload the certificate to the Voximplant Control Panel
  - android: Firebase certificate. Follow [this tutorial](https://voximplant.com/docs/introduction/integration/adding_sdks/push_notifications/android_sdk) to upload the certificate to the Voximplant Control Panel

### Medical Service Provider Appointments (Physical, Virtual & Home Visits)

<p align="center">
<br/><br/>
<img src="https://ik.imagekit.io/qlvke6f9z/appointments_z-hYMrax6.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1664660224280" height="100%" width="100%" alt="Appointments"/>
<br />
<br />

### Appointments Analytics

<p align="center">
<br/><br/>
<img src="https://ik.imagekit.io/qlvke6f9z/analytics_XCBLiaSCo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664739788850" height="100%" width="100%" alt="Appointments"/>
<br />
<br />
  
  ### Medical Records

<p align="center">
<br/><br/>
<img src="https://ik.imagekit.io/qlvke6f9z/medicalrecods_yddqRrzlT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664751050654" height="80%" width="80%" alt="MedicalRecords"/>
<br />
<br />


### Manual

You can set up it manually using our [Getting started](https://voximplant.com/docs/introduction) page and tutorials

#### VoxEngine scenario example:

```
require(Modules.PushService);
VoxEngine.addEventListener(AppEvents.CallAlerting, (e) => {
const newCall = VoxEngine.callUserDirect(
  e.call,
  e.destination,
  e.callerid,
  e.displayName,
  null
);
VoxEngine.easyProcess(e.call, newCall, ()=>{}, true);
});
```

## Build and run the app

1. Install React Native as described at [https://facebook.github.io/react-native/docs/getting-started.html#content](https://facebook.github.io/react-native/docs/getting-started.html#content)
2. Clone this repository
3. Run `yarn install` , all required components will be installed automatically

   ### iOS

   1. Run `pod install` from `react-native-demo/ios` folder
   2. Start XCode and open generated `VoximplantDemo.xcworkspace`

   ### Android

   no steps required

   Note:
   To enable android push notifications in the demo project:

   1. Follow [the instructions](https://voximplant.com/docs/introduction/integration/adding_sdks/push_notifications/android_sdk) to add the certificates to the Voximplant Cloud
   2. Add `google-services.json` file to android/app folder
   3. Open `app/build.gradle` file and uncomment the `//apply plugin: 'com.google.gms.google-services'` line

4. It is recommended to run `react-native start` command from root project directory.
5. Run your project from XCode (`Cmd+R`) for iOS, or use `react-native run-android` to run your project on Android.

## Useful links

Official guides:

- [Installing React Native SDK guide](https://voximplant.com/docs/introduction/integration/adding_sdks/installing/react_native_sdk)

## Have a question

- contact us via `support@voximplant.com`
- create an issue
- join our developer [community](https://discord.gg/sfCbT5u)
