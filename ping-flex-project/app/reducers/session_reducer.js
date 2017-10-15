import { RECEIVE_CURRENT_USER, RECEIVE_UPDATED_USER } from '../actions/session_actions';

const initialState = {currentUser: {} };

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        current_user: action.currentUser,
        session_token: action.token,
      };
    case RECEIVE_UPDATED_USER:
        return {
          current_user: action.updatedUser,
          session_token: state.session_token,
        };
    default:
      return state;
  }
};

export default SessionReducer;
