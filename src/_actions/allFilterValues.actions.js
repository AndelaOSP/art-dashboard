import axios from 'axios';
import constants from '../_constants';

const {
  FETCH_FILTER_VALUES_START,
  FETCH_FILTER_VALUES_SUCCESS,
  FETCH_FILTER_VALUES_FAILURE,
  ACTIVE_ACCORDION
} = constants;

/**
 * Load all filter values success
 *
 * @param {array} filters
 * @return {object} type and payload
 */
export const loadFilterValuesSuccess = filters => ({
  type: FETCH_FILTER_VALUES_SUCCESS,
  filters
});

export const loadAllFilterValues = () =>
  (dispatch) => {
    dispatch({ type: FETCH_FILTER_VALUES_START });
    return axios.get('filter-values')
      .then((response) => {
        dispatch(loadFilterValuesSuccess(response.data));
      })
      .catch({ type: FETCH_FILTER_VALUES_FAILURE });
  };

export const loadAccordionValue = index => (dispatch) => {
  dispatch(
    {
      type: ACTIVE_ACCORDION,
      index
    });
};
