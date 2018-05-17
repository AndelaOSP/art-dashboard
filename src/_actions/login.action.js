import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../_constants';

export const loginAction = () => {
  return (dispatch) => {
    if(localStorage.getItem('token')) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: false,
      })
    }
  }
}