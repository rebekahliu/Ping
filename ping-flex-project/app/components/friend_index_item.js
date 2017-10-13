import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
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
    return (
      <View style={styles.friend}>
        <Text>{this.props.friend.name}</Text>
        <Button
          onPress={()=>this.openChat(this.props.friend.chatroom_id)}
          title='chat'/>
      </View>
    );
  }
}

export default FriendIndexItem;

const styles = StyleSheet.create({
  friend: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple'
  }
});
