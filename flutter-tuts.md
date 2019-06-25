## Build Flutter Apps without installing the Android Studio in Windows 10 or using Android Command-Line Tools

- Download openJDK-8, `sdkmanager` works well with this version.
  https://adoptopenjdk.net/

- Issues running `sdkmanager`  on JDK  9 or higher refer,
  https://stackoverflow.com/questions/46402772/failed-to-install-android-sdk-java-lang-noclassdeffounderror-javax-xml-bind-a

- Download Android Command Line tools from
  https://developer.android.com/studio/

- Extract the command-line tools to a folder under `C:/android` - This would be your `ANDROID_PATH` variable.

- Install android sdk, platform tools using `sdkmanager`
```
$ sdkmanager "build-tools;28.0.3" "platform-tools" "platforms;android-28"
```

- Set the `C:\android\tools\bin` and `C:\android\platform-tools` folders to `path` variable

- Download the system image and google-apis for emulator to run properly.
```
$ sdkmanager "system-images;android-28;google_apis;x86"
```

- Accept all licenses
```
$ sdkmanager --licenses
```

- Set the `ANDROID_PATH` variable to `C:\android` where all platform tools, platform, tools, and emulators are installed are installed using `sdkmanager`

- Update the `SDK` using
```
$ sdkmanager --update
```

- Create an emulator using command line with `avdmanager`
```
$ avdmanager create avd -n my-emulator -k "system-images;android-28;google_apis;x86"
```

- List the emulators and start an emulator
```
$ avdmanager list
```

- Delete an emulator
```
$ avdmanager delete avd -n my-emulator
```

- Go to `emulator` directory under `C:\android\emulator` and start the emulator by running,
```
$ emulator -avd my-emulator
```

- Download `flutter-sdk` and set the `path` - Refer official documentation

- Install `flutter plugin` to `Visual Studio Code` to create flutter projects

- Run `flutter doctor` to make sure everything is setup properly.

- Open the Visual studio code and select `Flutter: New Project` option in `Command Palette` (Open Command Palette pressing `F1`)

- Once the app created, run the app in debug mode by pressing `F5` - it takes few minutes to build the app.

- Make the changes while updating, app hot reloads instantly

- To test the app in release mode, run
```
$ flutter run --profile
```
