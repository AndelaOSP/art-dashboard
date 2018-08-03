// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import { loadIncidenceReports } from '../../_actions/incidenceReports.actions';

// mock data
import incidenceReports from '../../_mock/incidenceReports';

const {
  LOAD_INCIDENCE_REPORTS_SUCCESS,
  LOAD_INCIDENCE_REPORTS_FAILURE,
  LOAD_INCIDENCE_REPORTS_START
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let mock;

describe.only('Incidence Reports Actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  it('should dispatch loadIncidenceReports actions', () => {
    mock.onGet().reply(200,
      {
        results: incidenceReports
      }
    );

    const expectedActions = [
      { type: LOAD_INCIDENCE_REPORTS_START },
      { type: LOAD_INCIDENCE_REPORTS_SUCCESS, incidenceReports: { results: incidenceReports } }
    ];

    return store.dispatch(loadIncidenceReports())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should dispatch LOAD_INCIDENCE_REPORTS_FAILURE when an error occurs', () => {
    mock.onGet('incidence-reports').reply(500);

    const expectedActions = [
      { type: LOAD_INCIDENCE_REPORTS_START },
      { type: LOAD_INCIDENCE_REPORTS_FAILURE }
    ];

    return store.dispatch(loadIncidenceReports())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
