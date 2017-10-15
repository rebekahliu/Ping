import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class FriendIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.openChat = this.openChat.bind(this);
  }

  openChat(chatroomId) {
    this.props.navigation.navigate('MessageTest', {chatroomId});
  }

  render() {
    const friend = this.props.friend;
    return (
      <TouchableOpacity style={styles.friend} onPress={this.props.onFriendPress}>
        <View style={styles.info}>
          <Image source={{uri: friend.pro_pic_url}}
            style={styles.friendPic} />
          <Text style={styles.name}>{friend.name}</Text>
        </View>
        <Button
          onPress={()=>this.openChat(friend.chatroom_id)}
          title='chat'/>
      </TouchableOpacity>
    );
  }
}

export default FriendIndexItem;

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
