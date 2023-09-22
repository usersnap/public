# Integration with Usersnap SDK

To integrate Usersnap SDK with react native, firstly follow the instructions provided for native apps (we send them together with SDK) to add Usersnap SDK to the native part of your project.

## IOS

Additionally for IOS you will need to add _UsersnapSdkMethods.swift_ and _UsersnapSdkMethods.m_ files (copy files from this example).

## Android

Additionally for Android please add these files: _OnActivityResultImplementation.java_, _UsersnapPackage.java_, _UsersnapSdkMethods.java_ (copy files from this example) and make the following change to _MainActivity.java_ :

```bash
# add these lines to the beginning of the file
protected OnActivityResultImplementation onActivityResultImplementation = null;
protected ActivityResultLauncher<Intent> mStartForResult = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
          result -> {
            onActivityResultImplementation.execute(result);
          });
```

Also please import the _UsersnapPackage_ in _MainApplication.java_ _getPackages()_ method and check your _app/build.gradle_ for missing dependencies.

If you have troubles with instructions, feel free to check the example code or reach out to our support.

After all the changes you will be able to use the SDK in you react-native code:

```bash
const {UsersnapSdkMethods} = NativeModules;

function App(): JSX.Element {
  useEffect(() => {
    UsersnapSdkMethods.configure('YOUR_API_KEY');
  }, []);

  const openFeedbackView = () => {
    UsersnapSdkMethods.openFeedbackView();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button onPress={openFeedbackView} title="Open Feedback view" />
      </View>
    </SafeAreaView>
  );
}
```

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
