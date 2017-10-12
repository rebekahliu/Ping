import React from 'react';
import { connect } from 'react-redux';
import { requestFriend } from '../actions/add_friend_actions';
import { suggestedFriends } from '../reducers/selectors';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import AddFriendItem from './add_friend_item';

class SuggestedFriends extends React.Component {
  constructor(props) {
    super(props);
  }

  // _addFriend (friendId) {
  //   console.log(friendId);
  //   this.props.requestFriend(this.props.current_user.id, friendId);
  // }

  _renderFriends({item}) {
    return (
      <AddFriendItem friend={item}
        token={this.props.token}
        requestFriend={this.props.requestFriend}/>
    );
  }

  render() {
    console.log(this.props.friends);
    return (
      <View style={styles.container}>
        <FlatList style={{flex: 1}} contentContainerStyle={styles.friendList}
          data={this.props.friends}
          renderItem={this._renderFriends.bind(this)}
          keyExtractor={(item) => item.id}/>
        <Text>{ (this.props.friends.length ? "" : "No friends found")}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.session.session_token,
  friends: suggestedFriends(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestFriend: (token, friendId) => dispatch(requestFriend(token, friendId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFriends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  friendList: {
    backgroundColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',

  },
});
