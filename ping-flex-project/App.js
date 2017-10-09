import React from 'react';
import API from './api';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import { AuthSession } from 'expo';



import {
  StackNavigator,
} from 'react-navigation';





class HomeScreen extends React.Component {

  state = {
    session_token: null,
  };

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open FB Auth" onPress={this._logIn} />
        {this.state.session_token ? (
          <Text>{JSON.stringify(this.state.session_token)}</Text>
        ) : null}
        </View>
    );
  }

 _logIn = async () => {
   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1751730575119352', {
       permissions: ['public_profile'],
     });
   if (type === 'success') {
     // Get the user's name using Facebook's Graph API
     const response = await fetch(
       `https://graph.facebook.com/me?access_token=${token}`);

      this.setState({session_token: token});
      API.doLogin((await response.json()).id,token);
     Alert.alert(
       'Logged in!',
       `Hi ${(await response.json()).name}!`,
     );
   }
 }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});
