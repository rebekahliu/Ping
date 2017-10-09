export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
// export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
import SessionAPI from '../util/session_api_util';

export const receiveCurrentUser = (currentUser) => (
  {
    type: RECEIVE_CURRENT_USER,
    currentUser
  }
);

export const receiveErrors = (errors) => (
  {
    type: RECEIVE_ERRORS,
    errors
  }
);


export const login = (fbId, token) => (dispatch) => {
  return (
    SessionAPI.login(fbId, token)
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errs) => dispatch(receiveErrors(errs))
    )

  );
};
