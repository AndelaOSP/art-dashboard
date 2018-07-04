import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_INCIDENCE_REPORTS_SUCCESS,
  LOAD_INCIDENCE_REPORTS_FAILURE,
  LOAD_INCIDENCE_REPORTS_START
} = constants;

const loadIncidenceReportsReducer = (state = initialState.incidenceReports, action) => {
  switch (action.type) {
    case LOAD_INCIDENCE_REPORTS_START:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_INCIDENCE_REPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reports: action.incidenceReports.results,
        incidenceReportsCount: action.incidenceReports.count
      };

    case LOAD_INCIDENCE_REPORTS_FAILURE:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        incidenceReportsCount: 0
      };

    default:
      return state;
  }
};

export default loadIncidenceReportsReducer;
