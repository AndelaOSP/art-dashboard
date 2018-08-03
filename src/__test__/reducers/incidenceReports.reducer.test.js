// third-party libraries
import expect from 'expect';

// reducer
import loadIncidenceReportsReducer from '../../_reducers/incidenceReports.reducer';

// initial mock state
import mockStore from '../../_mock/mockStore';

// mock data
import incidenceReports from '../../_mock/incidenceReports';

// actions
import { loadIncidenceReportsSuccess } from '../../_actions/incidenceReports.actions';

// constants
import constants from '../../_constants';

const { LOAD_INCIDENCE_REPORTS_FAILURE, LOAD_INCIDENCE_REPORTS_START } = constants;

describe('Incidence Reports Reducer', () => {
  const state = {
    reports: [],
    incidenceReportsCount: 0,
    hasError: false,
    isLoading: false
  };
  let action = {
    incidenceReports: {
      results: incidenceReports
    }
  };
  it('should handle LOAD_INCIDENCE_REPORTS_SUCCESS', () => {
    const expected = {
      reports: incidenceReports,
      incidenceReportsCount: 2,
      isLoading: false,
      hasError: false
    };

    action = loadIncidenceReportsSuccess({ results: incidenceReports, count: 2 });
    expect(loadIncidenceReportsReducer(mockStore.incidenceReports, action)).toEqual(expected);
  });

  it('should handle LOAD_INCIDENCE_REPORTS_FAILURE', () => {
    action.type = LOAD_INCIDENCE_REPORTS_FAILURE;
    expect(loadIncidenceReportsReducer(state, action).hasError).toBe(true);
    expect(loadIncidenceReportsReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_INCIDENCE_REPORTS_STARTS', () => {
    action.type = LOAD_INCIDENCE_REPORTS_START;
    expect(loadIncidenceReportsReducer(state, action).isLoading).toBe(true);
  });
});
