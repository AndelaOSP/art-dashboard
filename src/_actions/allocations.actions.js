import constants from '../_constants';
import axios from 'axios';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS,
} = constants;

export const loadAllocationsAction = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_ALLOCATIONS });
    return axios.get('allocations/')
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
