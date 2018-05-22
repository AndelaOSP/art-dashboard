import constants from '../_constants';

const { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } = constants;

export const loginAction = (token) => {
  return (dispatch) => {
    if (token) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: true,
      });
      localStorage.setItem('token', token);
    } else {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: false,
      })
    }
  }
}
