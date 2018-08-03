import expect from 'expect';
import userFeedbackReducer from '../../_reducers/userFeedback.reducer';
import feedbackMock from '../../_mock/userFeedback';
import constants from '../../_constants';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE, LOADING_FEEDBACK } = constants;

const initialState = {
  feedback: [],
  isLoading: false
};

const action = { payload: {} };

describe.only('Feedback Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(userFeedbackReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_FEEDBACK_SUCCESS', () => {
    action.type = LOAD_FEEDBACK_SUCCESS;
    action.payload.results = feedbackMock;
    expect(userFeedbackReducer(initialState, action).feedback).toEqual(action.payload.results);
    expect(userFeedbackReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_FEEDBACK_FAILURE', () => {
    action.type = LOAD_FEEDBACK_FAILURE;
    expect(userFeedbackReducer(initialState, action).feedback).toEqual([]);
    expect(userFeedbackReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_FEEDBACK', () => {
    action.type = LOADING_FEEDBACK;
    expect(userFeedbackReducer(initialState, action).feedback).toEqual([]);
    expect(userFeedbackReducer(initialState, action).isLoading).toEqual(true);
  });
});
