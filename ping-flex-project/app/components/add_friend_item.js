import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';

class AddFriendItem extends React.Component {
  disableButton() {
    if (this.props.friend.hasOwnProperty('require_approval')) {
      return true;
    } else {
      return false;
    }
  }

  buttonTitle() {
    if (this.props.friend.hasOwnProperty('require_approval')) {
      return "Pending";
    } else {
      return "Add";
    }
  }

  _addFriend (friendId) {
    console.log(friendId);
    this.props.requestFriend(this.props.token, friendId);
  }

  render() {
    return (
      <View style={styles.friend}>
        <Text>{this.props.friend.name}</Text>
        <Button
          onPress={()=>this._addFriend(this.props.friend.id)}
          title={this.buttonTitle()}
          disabled={this.disableButton()}/>
      </View>
    );
  }
}

export default AddFriendItem;

const styles = StyleSheet.create({
  friend: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple'
  }
});
