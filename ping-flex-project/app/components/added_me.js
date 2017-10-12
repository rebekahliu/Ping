import React from 'react';
import { connect } from 'react-redux';
import { approveFriend } from '../actions/add_friend_actions';
import { friendRequests } from '../reducers/selectors';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';

import AddFriendItem from './add_friend_item';

class AddedMe extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderFriends({item}) {
    return (
      <AddFriendItem friend={item}
        token={this.props.token}
        action={this.props.approveFriend}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ (this.props.friends.length ? "" : "No requests")}</Text>
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
  friends: friendRequests(state)
});

const mapDispatchToProps = (dispatch) => ({
  approveFriend: (token, friendId) => dispatch(approveFriend(token, friendId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddedMe);

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
