import React from 'react';

import Modal from 'react-native-modal';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

// import API from '../../api';
import LocationAPI from '../util/location_api_util';

import {
  StackNavigator,
} from 'react-navigation';

import {Location, Permissions} from 'expo';


import {allFriends} from '../reducers/selectors.js';

import * as PingActions from '../actions/ping_actions';

class HomeScreen extends React.Component {

  state = {
    isModalVisible: false,
    selectedFriendFbId: null,
  };

  static navigationOptions = {
    title: 'Home'
  };


  componentWillMount() {
    this._startWatch();
    API.registerForPushNotificationsAsync(this.props.session.session_token);
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
    LocationAPI.updateLocation(this.props.session.session_token, location.coords);
  }

  _renderButton = (text, onPress) => (
   <TouchableOpacity onPress={onPress}>
     <View style={styles.button}>
       <Text>{text}</Text>
     </View>
   </TouchableOpacity>
 );


  _renderItem = ({item}) => (
    <Text
      style={styles.friendItem}
      onPress={() => this.setState({ isModalVisible: true, selectedFriendFbId: item.key })}
      >
      {item.name}
    </Text>
  );

  _pingFriend = async (emergency) => {
    await this.props.ping(this.props.session.session_token, this.state.selectedFriendFbId, emergency);
    this.setState({ isModalVisible: false});
    this.props.navigation.navigate('Login');
  };

_pingFriend = async (emergency) => {
  let response = await this.props.ping(this.props.session.session_token, this.state.selectedFriendFbId, emergency);

  this._onPingCompletion(response);

};

_onPingCompletion = async (response) => {
  if (!response.friend.status) {
  Alert.alert('Ping Failed', 'The user you tried to ping is out of range.', [{text: 'OK', onPress: ()=>{this.setState({ isModalVisible: false})}}])
} else {
    //gotta send them a ping!


    //go to mapView
    this.setState({ isModalVisible: false});
    myLoc = await Expo.Location.getCurrentPositionAsync();

    let message = `${this.props.session.current_user.name} pinged you! They are currently at: Latitude: ${myLoc.coords.latitude} Longitude: ${myLoc.coords.longitude}`;

    API.sendPushNotificationAsync(response.friend.friend.facebook_id, message);

    this.props.navigation.navigate('PingMap', {myLoc});
  }

};

  _suggestedFriends = () => {
    this.props.navigation.navigate('SuggestedFriends');
  }

  _addedMe = () => {
    this.props.navigation.navigate('AddedMe');
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>hai {this.props.session.current_user.name}</Text>
        <Button style={styles.navigate} onPress={this._suggestedFriends} title="Add Friends"/>
        <Button style={styles.navigate} onPress={this._addedMe} title="Pending Requests"/>
        <FlatList style={styles.friendList}
          data={this.props.friends}
          extraData={this.state}
          renderItem={this._renderItem} />
        <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text>Ping your friend!</Text>
              <TouchableOpacity onPress={()=>this._pingFriend(false)}>
                <View style={styles.button}>
                  <Text>Ping</Text>
                </View>
              </TouchableOpacity>
              {this._renderButton('Close', () => this.setState({ isModalVisible: false, selectedFriendFbId: null }))}
          </View>
        </Modal>
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
  friendList: {
    backgroundColor: 'blue',
    alignSelf: 'stretch',
    flex: 1,
  },
  friendItem: {
    backgroundColor: 'red',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  navigate: {
    margin: 15,
  }
});

var mapStateToProps = (state) => {
  return {
    session: state.session,
    friends: allFriends(state),
    pinged_friend: state.pinged_friend,
  };
}

var mapDispatchToProps = (dispatch) => {
  return {
    ping: (token, fbId, emergency) => dispatch(PingActions.pingFriend(token, fbId, emergency))
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
