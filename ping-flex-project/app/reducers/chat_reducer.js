import {RECEIVE_CHANNEL} from '../actions/chat_actions';

const PingedFriendReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL:
      let newState = Object.assign({}, state);
      newState[action.channel.id] = action.channel;
      return newState;
    default:
      return state;
  }
};

export default PingedFriendReducer;
