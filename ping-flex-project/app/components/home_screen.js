import React from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import {connect} from 'react-redux';

import API from '../../api';

import {
  StackNavigator,
} from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>hai {this.props.state.session.currentUser.name}</Text>
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

var mapStateToProps = (state) => {
  return {
    state: state
  }
}

module.exports = connect(mapStateToProps)(HomeScreen);
