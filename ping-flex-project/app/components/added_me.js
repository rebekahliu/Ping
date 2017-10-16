import React from 'react';
import { connect } from 'react-redux';
import { approveFriend, getFriends } from '../actions/friend_actions';
import { friendRequests } from '../reducers/selectors';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  FlatList
} from 'react-native';

import AddFriendItem from './add_friend_item';

class AddedMe extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions() {
    return {
      headerStyle: (Platform.OS === 'ios') ? {} : {paddingLeft: 10, paddingRight:10, marginTop: 20},
      title: 'Pending Requests',
    };
  };

  componentWillMount() {
    this.props.getFriends(this.props.token);
  }

  _renderFriends({item}) {
    return (
      <AddFriendItem friend={item}
        token={this.props.token}
        action={this.props.approveFriend}/>
    );
  }

  _noFriends() {
    if (!this.props.friends.length) {
      return (
        <Text style={styles.noFriends}>No Requests</Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._noFriends()}
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
  approveFriend: (token, friendId) => dispatch(approveFriend(token, friendId)),
  getFriends: (token) => dispatch(getFriends(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddedMe);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addedMe: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'grey',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 7
  },
  friendList: {
    flex: 1,
    alignSelf: 'stretch',
  },
  noFriends: {
    fontSize: 14,
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 10
  }
});
