- Download openJDK 8
  https://adoptopenjdk.net/

- Download android command line Tools
  https://developer.android.com/studio/

- Install android platform tools using `sdkmanager`
```
$ sdkmanager "build-tools;28.0.3" "platform-tools" "platforms;android-28"
```

- Download the system image for android for emulator
```
$ sdkmanager "system-images;android-28;google_apis;x86"

// Accept all licenses
$ sdkmanager --licenses
```

- Set the ANDROID_PATH variable to folder where all platform tools, platform and tools are installed using `sdkmanager`
- Set the tools and platform-tools folder to path variable

- Update the sdk using
```
$ sdkmanager --update
```

- Create an emulator using command line
```
$ avdmanager create avd -n my-emulator -k "system-images;android-25;google_apis;x86"
```

- List the emulators and start an emulator
```
$ avdmanager list
```


- Download `flutter-sdk` and set the PATH

- Install `flutter plugin` to `Visual Studio Code` to create flutter projects

- Run `flutter doctor` to make sure everything is setup properly.

-

- Issues running sdkmanager refer, https://stackoverflow.com/questions/46402772/failed-to-install-android-sdk-java-lang-noclassdeffounderror-javax-xml-bind-a
