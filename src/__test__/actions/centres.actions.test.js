import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  loadCentres
} from '../../_actions/centres.actions';

import centres from '../../_mock/centres';

import constants from '../../_constants';

const {
  LOAD_CENTRES,
  LOAD_CENTRES_SUCCESS,
  LOAD_CENTRES_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Centres Action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'andela-centres/';

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_CENTRES when loadCentres is called', () => {
    mock.onGet(url).reply(200, centres.results);
    return store.dispatch(loadCentres()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_CENTRES
      });
    });
  });

  it('should dispatch LOAD_CENTRES_SUCCESS when loadCentres is called successfully', () => {
    mock.onGet(url).reply(200, centres.results);
    return store.dispatch(loadCentres()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: centres.results,
        type: LOAD_CENTRES_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_CENTRES_FAILURE when loadCentres is unsuccessful', () => {
    mock.onGet(url).reply(400, 'Could not load Andela centres');
    return store.dispatch(loadCentres()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 400'),
        type: LOAD_CENTRES_FAILURE
      });
    });
  });
});
