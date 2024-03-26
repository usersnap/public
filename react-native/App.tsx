import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  NativeModules,
  Button,
} from 'react-native';

const {UsersnapSdkMethods} = NativeModules;

function App(): JSX.Element {
  useEffect(() => {
    UsersnapSdkMethods.configure('YOUR_API_KEY');
  }, []);

  const openFeedbackView = () => {
    UsersnapSdkMethods.openFeedbackView({locale: 'de'});
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button onPress={openFeedbackView} title="Open Feedback view" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
});

export default App;
