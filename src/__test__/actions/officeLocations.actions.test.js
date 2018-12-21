import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loadOfficeLocations } from '../../_actions/officeLocations.actions';

import officeLocations from '../../_mock/officeLocations';

import constants from '../../_constants';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Centres Action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'andela-centres/?page=1&page_size=10';

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_LOCATIONS_REQUEST when loadOfficeLocations is called', () => {
    mock.onGet(url).reply(200, officeLocations.results);
    return store.dispatch(loadOfficeLocations(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_LOCATIONS_REQUEST
      });
    });
  });

  it('should dispatch LOAD_LOCATIONS_SUCCESS when loadOfficeLocations is called successfully', () => {
    mock.onGet(url).reply(200, officeLocations.results);
    return store.dispatch(loadOfficeLocations(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: officeLocations.results,
        type: LOAD_LOCATIONS_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_LOCATIONS_FAILURE when loadOfficeLocations is unsuccessful', () => {
    mock.onGet(url).reply(400, 'Could not load Andela centres');
    return store.dispatch(loadOfficeLocations(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 400'),
        type: LOAD_LOCATIONS_FAILURE
      });
    });
  });
});
