import React from 'react';
import {Location, Permissions} from 'expo';

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

import * as SessionActions from '../actions/session_actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

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
      await this.props.login(parsedResp.id, token);
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

// var mapStateToProps = (state) => {
//   return {
//     current_user: state.session.current_user,
//     session_token: state.session.session_token
//   }
// }

var mapDispatchToProps = (dispatch) => {
  return {
    login: (fbId, token) => dispatch(SessionActions.login(fbId, token))
  }
}

export default connect(null, mapDispatchToProps)(Login);
