import { fetchData } from '../_utils/helpers';
import constants from '../_constants';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS,
  RESET_ALLOCATIONS,
  SET_ACTIVE_PAGE
} = constants;

export const loadAllocationsAction = (pageNumber, limit) => (dispatch) => {
  const url = `allocations?page=${pageNumber}&page_size=${limit}`;
  dispatch(loading(true));
  return fetchData(url)
    .then(response => dispatch({
      type: LOAD_ALLOCATIONS_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_ALLOCATIONS_FAILURE,
      payload: error
    }));
};

export const loading = isLoading => ({
  type: LOADING_ALLOCATIONS,
  isLoading
});

export const resetAllocations = () => ({
  type: RESET_ALLOCATIONS
});

export const setActivePage = page => dispatch => dispatch(setActivePageSuccess(page));

const setActivePageSuccess = page => ({
  type: SET_ACTIVE_PAGE,
  payload: page
});
