import {RECEIVE_MESSAGE, RECEIVE_ALL_MESSAGES} from '../actions/message_actions';

const MessageReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MESSAGE:
      let newState = Object.assign([], state);
      newState.push(action.message);
      return newState;
    case RECEIVE_ALL_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};

export default MessageReducer;
