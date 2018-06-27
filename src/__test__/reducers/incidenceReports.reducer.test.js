// third-party libraries
import expect from 'expect';

// reducer
import loadIncidenceReportsReducer from '../../_reducers/incidenceReports.reducer';

// initial mock state
import { mockStore } from '../../_mock/mockStore';

// mock data
import incidenceReports from '../../_mock/incidenceReports';

// actions
import { loadIncidenceReportsSuccess } from '../../_actions/incidenceReports.actions';

describe('Incidence Reports Reducer', () => {
  it('should handle LOAD_INCIDENCE_REPORTS_SUCCESS', () => {
    const expected = {
      reports: incidenceReports,
      incidenceReportsCount: 2,
      isLoading: false,
      hasError: false
    };

    const action = loadIncidenceReportsSuccess(incidenceReports);
    expect(loadIncidenceReportsReducer(mockStore.incidenceReports, action)).toEqual(expected);
  });
});
