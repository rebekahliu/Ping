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

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    if(notification.data.message != "Welcome back!") {
      //should change this to a nice message-like thing that slides in at top and disappears after a bit
      Alert.alert('Incoming Ping',notification.data.message);
    }
  }

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
   let redirectUrl = AuthSession.getRedirectUrl();
   console.log({ redirectUrl });
   let result = await AuthSession.startAsync({
     authUrl:
       `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
       `&client_id=1751730575119352` +
       `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
   });

   if (result.type !== 'success') {
      alert('Uh oh, something went wrong');
      return;
    }

  let token = result.params.access_token;

  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`);

    const parsedResp = await response.json();
    this._setToken(token, parsedResp.id);


    //need to create an action that receives a current user?
    await this.props.login(parsedResp.id, token);
    this.props.navigation.navigate('HomeScreen');
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
