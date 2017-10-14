//display a splash screen.
//if there is a token in async storage, use it to login and go to home screen
//otherwise, direct to login page

import React from 'react';
import { connect } from 'react-redux';

import {
  StackNavigator,
} from 'react-navigation';


import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Store from 'react-native-store';
import * as SessionActions from '../actions/session_actions';


const DB = {
    'fbToken': Store.model('fbToken'),
}


class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const resp = await Store.model('fbToken').find();
    if(resp[resp.length - 1] < 2) {
      this.props.navigation.navigate('Login');
    } else {
      let fbId = resp[resp.length - 1].fbId
      let token = resp[resp.length - 1].token
      await this.props.login(fbId, token);
      this.props.navigation.navigate('HomeScreen');
    }
  }

  render() {
    return (
      <Text>Splash page!</Text>
    )
  }

}

var mapDispatchToProps = (dispatch) => {
  return {
    login: (fbId, token) => dispatch(SessionActions.login(fbId, token))
  }
}

export default connect(null, mapDispatchToProps)(Splash);
