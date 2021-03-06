import React from 'react';
import {connect} from 'react-redux';

import Modal from 'react-native-modal';

import {
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  BackHandler,
} from 'react-native';

import {icons} from '../../assets/icons';


import API from '../../api';
import LocationAPI from '../util/location_api_util';

import {
  StackNavigator,
} from 'react-navigation';

import {Notifications, Location, Permissions} from 'expo';

import { allFriends } from '../reducers/selectors.js';
import { getFriends } from '../actions/friend_actions';
import FriendIndexItem from './friend_index_item';

import * as PingActions from '../actions/ping_actions';

class HomeScreen extends React.Component {

  state = {
    isModalVisible: false,
    selectedFriendFbId: null,
    selectedFriendName: null,
    pingType: 'default',
  };

  static navigationOptions({navigation}) {
    return {
      title: 'Home',
            headerStyle: (Platform.OS === 'ios') ? {} : {paddingLeft: 10, paddingRight:10, marginTop: 20},
      headerRight: <Button onPress={()=>{navigation.navigate('Profile')}} title="Profile"/>,
      headerLeft: null,
    };
  };

  _handleNotification = async (notification) => {
    viewMap = async () => {
      let myLoc = {};
      //if it's android, we cant get current position, so we'll grab from the database.
      if(Platform.OS === 'android') {
        respLoc = await API.getOwnLocation(this.props.session.session_token);
        myLoc = {coords: {latitude: parseFloat(respLoc.lat),longitude: parseFloat(respLoc.lng)}};
      } else {
        myLoc = await Expo.Location.getCurrentPositionAsync();
      }
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


  componentWillMount() {
    API.registerForPushNotificationsAsync(this.props.session.session_token);
    this._startWatch();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.props.getFriends(this.props.session.session_token);
    BackHandler.addEventListener('hardwareBackPress', () => {
     return true;
    });
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
       <Text style={{fontSize: 16}}>{text}</Text>
     </View>
   </TouchableOpacity>
 );

 _onFriendPress = (friend) => {
   this.setState({ isModalVisible: true, selectedFriendFbId: friend.key, selectedFriendName: friend.name} )
 };


 _renderItem = ({item}) => (
   <FriendIndexItem
     friend={item}
     onFriendPress={()=>{this._onFriendPress(item)}}
     style={styles.friendItem}
     navigation={this.props.navigation}
     />
);

  _pingFriend = async (pingType) => {
    let emergency = false;
    if (pingType == 'emergency') {
      emergency = true;
    }
    let response = await this.props.ping(this.props.session.session_token, this.state.selectedFriendFbId, emergency);
    this._onPingCompletion(response, pingType);
  };

  _onPingCompletion = async (response, pingType) => {
    if (!response.friend.status) {
    Alert.alert('Ping Failed', 'The user you tried to ping is out of range.', [{text: 'OK', onPress: ()=>{this.setState({ isModalVisible: false, selectedFriendFbId: null, selectedFriendName: null, pingType: 'default' })}}])
  } else {
      //gotta send them a ping!
      this.setState({ isModalVisible: false, selectedFriendFbId: null, selectedFriendName: null, pingType: 'default' });

      let myLoc = {};
      //if it's android, we cant get current position, so we'll grab from the database.
      if(Platform.OS === 'android') {

        respLoc = await API.getOwnLocation(this.props.session.session_token);
        myLoc = {coords: {latitude: parseFloat(respLoc.lat),longitude: parseFloat(respLoc.lng)}};
      } else {
        myLoc = await Expo.Location.getCurrentPositionAsync();
      }

      let message = `${this.props.session.current_user.name}` + pingMessages[pingType];

      let {pro_pic_url, name} = this.props.currentUser

      let pingSendData = {message, pingedFriend: {chatroom_id: response.friend.chatroom_id, friend: {location: {lat: myLoc.coords.latitude, lng: myLoc.coords.longitude}, pro_pic_url, name} }}
      API.sendPushNotificationAsync(response.friend.friend.facebook_id, pingSendData);
      //go to mapView
      this.props.navigation.navigate('PingMap', {myLoc, pingedFriend: response.friend});
    }

  };

  _togglePingType = (pingType) => {
    if (this.state.pingType == pingType) {
      this.setState({pingType: 'default'})
    } else {
      this.setState({pingType: pingType})
    }
  }

  _noFriends() {
    if (!this.props.friends.length) {
      return (
        <Text style={styles.noFriends}>No friends added yet. Go to profile to add friends!</Text>
      );
    }
  }


  render() {
    const customIcon1 = icons[this.props.currentUser.custom_ping_icons[0]];
    const customIcon2 = icons[this.props.currentUser.custom_ping_icons[1]];
    const customIcon3 = icons[this.props.currentUser.custom_ping_icons[2]];

    return (
      <View style={styles.container}>
        {this._noFriends()}
        <FlatList style={styles.friendList}
          data={this.props.friends}
          extraData={this.state}
          renderItem={this._renderItem} />
        <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 20, paddingBottom: 5}}>
              Ping {this.state.selectedFriendName}
            </Text>
            <View style={styles.radioButtons}>
              <TouchableHighlight
                onPress={()=> this._togglePingType(this.props.currentUser.custom_ping_icons[0])}
                style={[styles.pingRadio, this.state.pingType == this.props.currentUser.custom_ping_icons[0] && styles.pingRadioSelected]}>
               <Image
                  style={{width: 25, height: 25}}
                  source={customIcon1} />
              </TouchableHighlight>

              <TouchableHighlight
                onPress={()=> this._togglePingType(this.props.currentUser.custom_ping_icons[1])}
                style={[styles.pingRadio, this.state.pingType == this.props.currentUser.custom_ping_icons[1] && styles.pingRadioSelected]}>
               <Image
                  style={{width: 25, height: 25}}
                  source={customIcon2} />
              </TouchableHighlight>

              <TouchableHighlight
                onPress={()=> this._togglePingType(this.props.currentUser.custom_ping_icons[2])}
                style={[styles.pingRadio, this.state.pingType == this.props.currentUser.custom_ping_icons[2] && styles.pingRadioSelected]}>
                <Image
                  style={{width: 25, height: 25}}
                  source={customIcon3} />
              </TouchableHighlight>
            </View>

            <View style={styles.actionButtons}>
              {this._renderButton('Close', () => this.setState({ isModalVisible: false, selectedFriendFbId: null, selectedFriendName: null, pingType: 'default' }))}
              <TouchableOpacity onPress={()=>this._pingFriend(this.state.pingType)}>
                <View style={styles.button}>
                  <Text style={{fontSize: 16}}>Ping</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    marginTop: 20,
  },
  friendHeader: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'grey',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 7
  },
  friendList: {
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  navigate: {
    margin: 15,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pingRadio: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    borderColor: 'white'
  },
  pingRadioSelected: {
    backgroundColor: 'lightblue',
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

//wrap default in a string so it doesn't get picked up as a js keyword
const pingMessages = {
  'default': " pinged you!",
  none: " pinged you!",
  home: " pinged you: Hey, are you home?",
  food: " pinged you: Hey, want to get food?",
  emergency: " emergency pinged you: Are you ok?",
  school: " pinged you: Hey, are you at school?",
  work: " pinged you: Hey, are you at work?",
  drinks: " pinged you: Hey, want to get drinks?",
  coffee: " pinged you: Hey, want to grab coffee?",
  gym: " pinged you: Hey, want to go to the gym?",
};

var mapStateToProps = (state) => {
  return {
    session: state.session,
    currentUser: state.session.current_user,
    friends: allFriends(state),
    pinged_friend: state.pinged_friend,
  };
}

var mapDispatchToProps = (dispatch) => {
  return {
    ping: (token, fbId, emergency) => dispatch(PingActions.pingFriend(token, fbId, emergency)),
    getFriends: (token) => dispatch(getFriends(token))
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
