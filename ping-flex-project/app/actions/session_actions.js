export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
// export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
import SessionAPI from '../util/session_api_util';
import API from '../../api';


export const receiveCurrentUser = (currentUser, token) => (
  {
    type: RECEIVE_CURRENT_USER,
    currentUser,
    token,
  }
);

export const receiveUpdatedUser = (updatedUser) => (
  {
    type: RECEIVE_UPDATED_USER,
    updatedUser,
  }
);

export const receiveErrors = (errors) => (
  {
    type: RECEIVE_ERRORS,
    errors
  }
);


export const updateUser = (token, settings) => (dispatch) => {
  return (
    API.updateSettings(token, settings).then(
      (updatedUser) => {
        return dispatch(receiveUpdatedUser(updatedUser));
      },
      (errs) => {
        return dispatch(receiveErrors(errs));
      }
    )
  );
};


export const login = (fbId, token) => (dispatch) => {
  return (
    SessionAPI.login(fbId, token).then(
      (currentUser) => {
        debugger 
        return dispatch(receiveCurrentUser(currentUser, token));
      },
      (errs) => {
        debugger
        return dispatch(receiveErrors(errs));
      }
    )
  );
};
