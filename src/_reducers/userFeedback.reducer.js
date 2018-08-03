import constants from '../_constants';
import initialState from './initialState';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE, LOADING_FEEDBACK } = constants;


export default (state = initialState.userFeedback, action) => {
  switch (action.type) {
    case LOAD_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: action.payload.results,
        feedbackCount: action.payload.count,
        isLoading: false
      };
    case LOAD_FEEDBACK_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case LOADING_FEEDBACK:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
