import { RECEIVE_FRIENDS } from '../actions/friend_actions';

const initialState = {friends: {}, fbFriends: {}, pendingFriends: {} };

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIENDS:
      console.log(action.friends);
      return {
        friends: action.friends,
      };
    default:
      return state;
  }
};

export default SessionReducer;
