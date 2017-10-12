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
    const friend = this.props.friend;
    if (friend.require_approval === false) {
      return true;
    } else {
      return false;
    }
  }

  buttonTitle() {
    const friend = this.props.friend;
    if (friend.require_approval === false) {
      return "Pending";
    } else if (friend.require_approval === true) {
      return "Approve";
    } else {
      return "Add";
    }
  }

  _addFriend (friendId) {
    console.log(friendId);
    this.props.action(this.props.token, friendId);
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
