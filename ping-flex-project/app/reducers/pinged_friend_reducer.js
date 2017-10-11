import {RECEIVE_PINGED_FRIEND} from '../actions/ping_actions';

const initialState = {};

const PingedFriendReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PINGED_FRIEND:
      return action.friend
    default:
      return state;
  }
};

export default PingedFriendReducer;
