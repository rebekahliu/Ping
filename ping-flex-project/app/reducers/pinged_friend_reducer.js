import {RECEIVE_FRIEND} from '../actions/ping_actions';

const initialState = {};

const PingedFriendReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIEND:
      return {
        pinged_friend: action.friend
      };
    default:
      return state;
  }
};

export default PingedFriendReducer;
