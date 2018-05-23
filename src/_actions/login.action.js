import constants from '../_constants';
import { history } from '../_helpers/history';

const { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } = constants;

export const loginAction = () => {
  return (dispatch) => {
    // Firebase API call
    localStorage.setItem('token', 'dncjdbhdbhdbdbsdbsdbhbsh')
    if (localStorage.getItem('token')) {
      history.push('/dashboard');
      dispatch({
        type: LOGIN_USER_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGIN_USER_FAILURE,
      })
    }
  }
}