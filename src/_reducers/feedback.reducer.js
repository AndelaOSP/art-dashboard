import constants from '../_constants';
import initialState from './initialState';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE } = constants;


export default (state = initialState.feedback, action) => {
  switch (action.type) {
    case LOAD_FEEDBACK_SUCCESS:
      return {
        ...state, feedback: action.payload.data
      };
    case LOAD_FEEDBACK_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
