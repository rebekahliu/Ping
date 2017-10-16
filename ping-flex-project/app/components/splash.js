//display a splash screen.
//if there is a token in async storage, use it to login and go to home screen
//otherwise, direct to login page

import React from 'react';
import { connect } from 'react-redux';

import {
  StackNavigator
} from 'react-navigation';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import { Notifications } from 'expo';

import Store from 'react-native-store';
import * as SessionActions from '../actions/session_actions';


const DB = {
    'fbToken': Store.model('fbToken'),
}

class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions() {
    return {
      header: null
    };
  };

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = async (notification) => {
    viewMap = async () => {
      let myLoc = await Expo.Location.getCurrentPositionAsync();

      this.props.navigation.navigate('PingMap', {myLoc, pingedFriend: notification.data.pingedFriend});
    };

    if(notification.data.message != "Welcome back!") {
      Alert.alert('Incoming Ping',notification.data.message,
        [
        {text: 'View on Map', onPress: viewMap},
        {text: 'Dismiss', style: 'cancel'},
        ],
      );
    }
  }

  async componentDidMount() {
    const timeout = setTimeout( async function() {
      const resp = await Store.model('fbToken').find();
      if(!resp || Object.keys(resp[resp.length - 1]) < 4) {
        this.props.navigation.navigate('Login');
      } else {
        let fbId = resp[resp.length - 1].fbId;
        let token = resp[resp.length - 1].token;
        await this.props.login(fbId, token);;
        this.props.navigation.navigate('HomeScreen');
      }
    }.bind(this), 2000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/splashpage.png')}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9a8d',
  },
});

var mapDispatchToProps = (dispatch) => {
  return {
    login: (fbId, token) => dispatch(SessionActions.login(fbId, token))
  };
};

export default connect(null, mapDispatchToProps)(Splash);
