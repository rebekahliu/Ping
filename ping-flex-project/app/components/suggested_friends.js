import React from 'react';
import { connect } from 'react-redux';
import { requestFriend, getFriends } from '../actions/friend_actions';
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

  static navigationOptions() {
    return {
      title: 'Suggested Friends',
            headerStyle: (Platform.OS === 'ios') ? {} : {paddingLeft: 10, paddingRight:10, marginTop: 20},
    };
  };

  componentWillMount() {
    this.props.getFriends(this.props.token);
  }

  _renderFriends({item}) {
    return (
      <AddFriendItem friend={item}
        token={this.props.token}
        action={this.props.requestFriend}/>
    );
  }

  _noFriends() {
    if (!this.props.friends.length) {
      return (
        <Text style={styles.noFriends}>No Friends Found</Text>
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
  friends: suggestedFriends(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestFriend: (token, friendId) => dispatch(requestFriend(token, friendId)),
  getFriends: (token) => dispatch(getFriends(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFriends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addFriend: {
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
