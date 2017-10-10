import React from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import API from '../../api';
import LocationAPI from '../util/location_api_util';

import {
  StackNavigator,
} from 'react-navigation';

import {Location, Permissions} from 'expo';


import {allFriends} from '../reducers/selectors.js';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home'
  };


  componentWillMount() {
    this._startWatch();
  }

  _startWatch = async () => {
    let { status } = await Expo.Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
    } else {
      Expo.Location.watchPositionAsync({
        enableHighAccuracy: true,
        timeInterval: 5000,
        distanceInterval: 5,
      }, this._updateLocation);
    }
  }

  _updateLocation = (location) => {
    // Alert.alert('location', 'updating location')
    LocationAPI.updateLocation(this.props.session.session_token, location.coords);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>hai {this.props.session.current_user.name}</Text>
        <FlatList
          data={this.props.friends}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
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
    session: state.session,
    friends: allFriends(state),
  }
}

module.exports = connect(mapStateToProps)(HomeScreen);
