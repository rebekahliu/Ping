export const RECEIVE_PINGED_FRIEND = 'RECEIVE_PINGED_FRIEND';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

import FriendAPI from '../util/session_api_util';

export const receivePingedFriend = (friend) => (
  {
    type: RECEIVE_PINGED_FRIEND,
    friend
  }
);

export const receiveErrors = (errors) => (
  {
    type: RECEIVE_ERRORS,
    errors
  }
);

export const pingFriend = (token) => (dispatch) => {
  return (
    PingAPI.pingFriend(token, friendId)
    .then(
      (friend) => dispatch(receivePingedFriend(friend)),
      (errs) => dispatch(receiveErrors(errs))
    )
  );
};
