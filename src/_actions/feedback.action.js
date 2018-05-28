import constants from '../_constants';
import axios from 'axios';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE } = constants;

export const feedbackAction = (page, limit = 10) => {
    return (dispatch) => {
      axios.get(`feedback?_page=${page}&_limit=${limit}`)
      .then((response) => {
        return dispatch({
          type: LOAD_FEEDBACK_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOAD_FEEDBACK_FAILURE,
          payload: error,
        });
      });
    }
  };
  