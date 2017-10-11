import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet
} from 'react-native';

class AddFriendItem extends React.Component {

  _addFriend (friendId) {
    console.log(friendId);
    this.props.requestFriend(this.props.token, friendId);
  }

  render() {
    return (
      <View>
        <Text>{this.props.friend.name}</Text>
        <Button
          onPress={()=>this._addFriend(this.props.friend.id)}
          title="Add" />
      </View>
    );
  }
}

export default AddFriendItem;
