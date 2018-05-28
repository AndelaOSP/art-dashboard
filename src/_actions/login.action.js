import constants from '../_constants';

const { LOGIN_USER_SUCCESS } = constants;

export const loginAction = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS
    });
  };
}
