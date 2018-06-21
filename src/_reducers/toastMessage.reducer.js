import constants from '../_constants';
import initialState from './initialState';

const { UPDATE_TOAST_MESSAGE_CONTENT, RESET_TOAST_MESSAGE_CONTENT } = constants;

export default (state = initialState.toastMessage, action) => {
  switch (action.type) {
    case UPDATE_TOAST_MESSAGE_CONTENT:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      };
    case RESET_TOAST_MESSAGE_CONTENT:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      };
    default:
      return state;
  }
};
