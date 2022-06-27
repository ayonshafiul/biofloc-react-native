import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {TextInput, Button} from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackBarText, setSnackBarText] = useState('');
  const [user, setUser] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  function onAuthStateChanged(user) {
    if(user && user.uid) {
      navigation.replace("dashboard")
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const doLogin = (loginEmail, loginPassword) => {
    if (loginPassword.length < 4) {
      console.log('Please type at least 4 characters');
      return;
    }
    auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  if (!user) {
    return (
      <>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              <TextInput
                variant="outlined"
                label="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
                style={styles.textInputStyle}
              />
              <TextInput
                variant="outlined"
                label="Password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                style={styles.textInputStyle}
              />

              <Button
                title="Login"
                onPress={() => doLogin(email, password)}
                style={styles.buttonStyle}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  textInputStyle: {
    margin: 16,
  },
  buttonStyle: {
    margin: 16,
  },
});

export default Login;
