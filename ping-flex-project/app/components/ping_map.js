import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Button,
  Platform,
  StyleSheet,

} from 'react-native';

import Modal from 'react-native-modal';


import {
  StackNavigator,
} from 'react-navigation';

import { MapView } from 'expo';
import {connect} from 'react-redux';


class PingMap extends React.Component {
  constructor(props) {
    super(props)
  }


  static navigationOptions({navigation}) {
    let chatroomId = navigation.state.params.pingedFriend.chatroom_id
    return {
      title: `${navigation.state.params.pingedFriend.friend.name}`,
            headerStyle: (Platform.OS === 'ios') ? {} : {paddingLeft: 10, paddingRight:10, marginTop: 20},
      headerRight: <Button
        onPress={()=>navigation.navigate('MessageTest', {chatroomId, friendName: navigation.state.params.pingedFriend.friend.name})}
        title='Chat'/>,
    };
  };




  render() {
    let pinged_friend = this.props.navigation.state.params.pingedFriend || this.props.pinged_friend;

    let my_lat = this.props.navigation.state.params.myLoc.coords.latitude;
    let my_lng = this.props.navigation.state.params.myLoc.coords.longitude;
    let friend_lat = parseFloat(pinged_friend.friend.location.lat);
    let friend_lng = parseFloat(pinged_friend.friend.location.lng);
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        ref={ref => { this.map = ref; }}
          style={styles.map}
        initialRegion={{
          latitude: (my_lat + friend_lat)/2,
          longitude: (my_lng + friend_lng)/2,
          latitudeDelta: Math.abs(my_lat - friend_lat) * 2,
          longitudeDelta: Math.abs(my_lng - friend_lng) * 2,
        }}
        >

          <MapView.Marker
              coordinate={{latitude: friend_lat,
              longitude: friend_lng}}>
            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: pinged_friend.friend.pro_pic_url}} />
          </MapView.Marker>
          <MapView.Marker
              coordinate={{latitude: my_lat,
              longitude: my_lng,}}>
            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.session.current_user.pro_pic_url}} />
          </MapView.Marker>

        </MapView>

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
  map: {
  ...StyleSheet.absoluteFillObject,
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
});



var mapStateToProps = (state) => {
  return {
    session: state.session,
    pinged_friend: state.pinged_friend,
  };
}

// var mapDispatchToProps = (dispatch) => {
//   return {
//     ping: (token, fbId, emergency) => dispatch(PingActions.pingFriend(token, fbId, emergency))
//   };
// }

module.exports = connect(mapStateToProps, null)(PingMap);
