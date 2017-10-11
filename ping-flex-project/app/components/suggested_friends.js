import React from 'react';
import { connect } from 'react-redux';
import { requestFriend } from '../actions/add_friend_actions';
import { suggestedFriends } from '../reducers/selectors';
import { Text, View, StyleSheet } from 'react-native';

class SuggestedFriends extends React.Component {



  render() {
    console.log(this.props.friends);
    return (
      <View>
        <Text>Suggested Friends Screen!</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: suggestedFriends(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestFriend: (token, friendId) => dispatch(requestFriend(token, friendId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFriends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
