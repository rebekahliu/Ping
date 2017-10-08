import React from 'react';
import {
  Text,
  View,
  Alert
} from 'react-native';



import {
  StackNavigator,
} from 'react-navigation';

async function logIn() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1751730575119352', {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text onPress={this._handlePress}>Continue with Facebook</Text>
      </View>
    )
  }

  _handlePress = () => {
    logIn();
  }



}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});
