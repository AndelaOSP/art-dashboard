import axios from 'axios';
import constants from '../_constants';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE } = constants;

const feedbackAction = (page, limit = 10) => (dispatch) => {
  axios.get(`user-feedback?_page=${page}&_limit=${limit}`)
    .then(response => dispatch({
      type: LOAD_FEEDBACK_SUCCESS,
      payload: response,
    }))
    .catch(error => dispatch({
      type: LOAD_FEEDBACK_FAILURE,
      payload: error,
    }));
};

export default feedbackAction;
