import { receiveErrors } from './ping_actions';
// export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';

import FriendAPI from '../util/friend_api_util';

// export const receiveFriendRequest = (currentUser) => ({
//   type: RECEIVE_FRIEND_REQUEST,
//   currentUser
// });

export const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  friends
});

export const requestFriend = (token, friendId) => (dispatch) => {
  return (
    FriendAPI.requestFriend(token, friendId)
      .then(
        (friends) => dispatch(receiveFriends(friends)),
        (error) => dispatch(receiveErrors(error))
      )
  );
};

export const approveFriend = (token, friendId) => (dispatch) => {
  return (
    FriendAPI.approveFriend(token, friendId)
      .then(
        (friends) => dispatch(receiveFriends(friends)),
        (error) => dispatch(receiveErrors(error))
      )
  );
};

export const getFriends = (token) => (dispatch) => {
  return (
    FriendAPI.getFriends(token)
      .then(
        (friends) => dispatch(receiveFriends(friends)),
        (error) => dispatch(receiveErrors(error))
      )
  );
};
