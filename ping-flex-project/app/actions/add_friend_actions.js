import { receiveErrors } from './ping_actions';
export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
// export const RECEIVE_FRIEND_APPROVE = 'RECEIVE_FRIEND_APPROVE';

import AddFriendAPI from '../util/add_friend_api_util';

export const receiveFriendRequest = (currentUser) => ({
  type: RECEIVE_FRIEND_REQUEST,
  currentUser
});

// export const receiveFriendApprove = (currentUser) => ({
//   type: RECEIVE_FRIEND_APPROVE,
//   currentUser
// });

export const requestFriend = (token, friendId) => (dispatch) => {
  return (
    AddFriendAPI.requestFriend(token, friendId)
      .then(
        (currentUser) => dispatch(receiveFriendRequest(currentUser)),
        (error) => dispatch(receiveErrors(error))
      )
  );
};

export const approveFriend = (token, friendId) => (dispatch) => {
  return (
    AddFriendAPI.approveFriend(token, friendId)
      .then(
        (currentUser) => dispatch(receiveFriendRequest(currentUser)),
        (error) => dispatch(receiveErrors(error))
      )
  );
};
