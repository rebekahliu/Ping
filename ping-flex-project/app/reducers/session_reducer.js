import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_FRIEND_REQUEST } from '../actions/add_friend_actions';
import { merge } from 'lodash';

const initialState = {currentUser: {} };

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        current_user: action.currentUser,
        session_token: action.token,
      };
    case RECEIVE_FRIEND_REQUEST:
      let newState = merge({}, state);
      newState.current_user = action.currentUser;
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
