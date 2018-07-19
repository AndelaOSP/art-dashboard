import axios from 'axios';
import constants from '../_constants';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE, LOADING_FEEDBACK } = constants;

const feedbackAction = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOADING_FEEDBACK });
  return axios.get(`user-feedback?page=${pageNumber}&page_size=${limit}`)
    .then(response => dispatch({
      type: LOAD_FEEDBACK_SUCCESS,
      payload: response.data
    }))
    .catch(error => dispatch({
      type: LOAD_FEEDBACK_FAILURE,
      payload: error
    }));
};

export default feedbackAction;
