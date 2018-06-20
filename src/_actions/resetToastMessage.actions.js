import constants from '../_constants';

const { RESET_TOAST_MESSAGE_CONTENT } = constants;

export default () => (dispatch =>
  dispatch({
    type: RESET_TOAST_MESSAGE_CONTENT,
    payload: {
      message: '',
      type: ''
    }
  })
);
