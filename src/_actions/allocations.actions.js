import constants from '../_constants';
import axios from 'axios';

const { LOAD_ALLOCATIONS_SUCCESS, LOAD_ALLOCATIONS_FAILURE } = constants;

export const loadAllocationsAction = () => {
  return (dispatch) => {
    axios.get('allocations/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('art-prod-web-token')}`,
      }
    })
      .then((response) => {
        return dispatch({
          type: LOAD_ALLOCATIONS_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOAD_ALLOCATIONS_FAILURE,
          payload: error,
        });
      });
  }
}
