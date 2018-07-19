import axios from 'axios';
import constants from '../_constants';

// constants
const {
  LOAD_INCIDENCE_REPORTS_SUCCESS,
  LOAD_INCIDENCE_REPORTS_FAILURE,
  LOAD_INCIDENCE_REPORTS_START
} = constants;

/**
 * Load incidence reports success
 *
 * @param {array} incidenceReports
 * @return {object} type and payload
 */
export const loadIncidenceReportsSuccess = incidenceReports => (
  { type: LOAD_INCIDENCE_REPORTS_SUCCESS, incidenceReports }
);

/**
 * Incidence reports thunk
 *
 * @return {(dispatch:any)=>Promise<TResult2|TResult1>}
 */
export const loadIncidenceReports = (pageNumber, limit) =>
  (dispatch) => {
    dispatch({ type: LOAD_INCIDENCE_REPORTS_START });
    return axios.get(`incidence-reports?page=${pageNumber}&page_size=${limit}`)
      .then((response) => {
        dispatch(loadIncidenceReportsSuccess(response.data));
      })
      .catch(() => dispatch({ type: LOAD_INCIDENCE_REPORTS_FAILURE }));
  };
