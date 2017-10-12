import React from 'react';
import { connect } from 'react-redux';
import { requestFriend } from '../actions/add_friend_actions';
import { suggestedFriends } from '../reducers/selectors';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';

import AddFriendItem from './add_friend_item';

class SuggestedFriends extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderFriends({item}) {
    return (
      <AddFriendItem friend={item}
        token={this.props.token}
        action={this.props.requestFriend}/>
    );
  }

  render() {
    console.log(this.props.friends);
    return (
      <View style={styles.container}>
        <Text>{ (this.props.friends.length ? "" : "No friends found")}</Text>
        <FlatList style={{flex: 1}} contentContainerStyle={styles.friendList}
          data={this.props.friends}
          renderItem={this._renderFriends.bind(this)}
          keyExtractor={(item) => item.id}/>
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
  },
  friendList: {
    backgroundColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
});
