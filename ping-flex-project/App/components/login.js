import React from 'react';
import API from '../../api';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

class Login extends React.Component {

  static navigationOptions = {
    title: 'Login'
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button title="Open FB Auth" onPress={()=>this._logIn(navigate)} />
      </View>
    );
  }

 _logIn = async (navigate) => {
   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1751730575119352', {
       permissions: ['public_profile', 'user_friends'],
     });
   if (type === 'success') {
     const response = await fetch(
       `https://graph.facebook.com/me?access_token=${token}`);

      this.setState({session_token: token});
      const parsedResp = await response.json();

      //need to create an action that receives a current user?

      API.doLogin(parsedResp.id,token);
      navigate('HomeScreen');
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

export default Login;
