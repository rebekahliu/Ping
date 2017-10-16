import React from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import Store from 'react-native-store';

const DB = {
    'fbToken': Store.model('fbToken'),
}


import { AuthSession, Notifications } from 'expo';

import {connect} from 'react-redux';

import {
  StackNavigator,
} from 'react-navigation';

import * as SessionActions from '../actions/session_actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions() {
    return {
      header: null
    };
  };


  _setToken = (token, fbId) => {
    DB.fbToken.add({
      token: token,
      fbId: fbId,
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Button title="Open FB Auth" onPress={this._logIn} />
      </View>
    );
  }

 _logIn = async () => {

   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1751730575119352', {
       permissions: ['public_profile', 'email', 'user_friends'],
     });

   if (type !== 'success') {
      alert('Uh oh, something went wrong');
      return;
    } else {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);

      const parsedResp = await response.json();
      this._setToken(token, parsedResp.id);


      //need to create an action that receives a current user?
      await this.props.login(parsedResp.id, token);
      this.props.navigation.navigate('HomeScreen');
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

var mapDispatchToProps = (dispatch) => {
  return {
    login: (fbId, token) => dispatch(SessionActions.login(fbId, token))
  }
}

export default connect(null, mapDispatchToProps)(Login);
