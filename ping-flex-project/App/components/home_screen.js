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

class HomeScreen extends React.Component {

  state = {
    session_token: null,
  };

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>hai</Text>
      </View>
    );
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
