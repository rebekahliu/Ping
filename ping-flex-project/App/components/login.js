import React from 'react';
// import API from '../../api';

import * as SessionActions from '../actions/session_actions';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import {connect} from 'react-redux';

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

      const parsedResp = await response.json();

      //need to create an action that receives a current user?
      this.props.login(parsedResp.id, token);
      // API.doLogin(parsedResp.id,token);
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


var mapDispatchToProps = (dispatch) => {
  return {
    login: (fbId, token) => dispatch(SessionActions.login(fbId, token))
  }
}

export default connect(null, mapDispatchToProps)(Login);
