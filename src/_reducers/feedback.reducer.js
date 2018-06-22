import constants from '../_constants';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE } = constants;

const initialState = {
  feedback: [],
  feedbackCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: [...action.payload.data],
        feedbackCount: action.payload.headers['x-total-count'],
      };
    case LOAD_FEEDBACK_FAILURE:
      return {
        ...state,
        feedback: [],
      };
    default:
      return state;
  }
};
