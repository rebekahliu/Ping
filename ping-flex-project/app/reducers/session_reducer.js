import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

const initialState = {currentUser: {} };

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};

export default SessionReducer;
