import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';

class AddFriendItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: this.buttonTitle(),
      disabled: this.disableButton()
    };
  }

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
    this.props.action(this.props.token, friendId);
    if (!this.props.friend.require_approval) {
      this.setState({ button: 'Pending' });
    }
    this.setState({ disabled: true });
  }

  render() {
    const friend = this.props.friend;
    return (
      <View style={styles.friend}>
        <View style={styles.info}>
          <Image source={{uri: friend.pro_pic_url}}
            style={styles.friendPic} />
          <Text style={styles.name}>{friend.name}</Text>
        </View>
        <Button
          onPress={()=>this._addFriend(friend.id)}
          title={this.state.button}
          disabled={this.state.disabled}/>
      </View>
    );
  }
}

export default AddFriendItem;

const styles = StyleSheet.create({
  friend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    paddingHorizontal: 10,
    fontSize: 18
  },
  friendPic: {
    width: 45,
    height: 45,
    borderRadius: 45/2
  }
});
