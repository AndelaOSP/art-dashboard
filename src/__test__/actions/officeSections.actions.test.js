import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import loadOfficeSections from '../../_actions/officeSections.actions';

import officeSections from '../../_mock/officeSections';

const {
  LOAD_OFFICE_SECTIONS_REQUEST,
  LOAD_OFFICE_SECTIONS_SUCCESS,
  LOAD_OFFICE_SECTIONS_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let mock;

describe('Office Sections Actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_OFFICE_SECTIONS_REQUEST when fetching office Sections', () => {
    expect.hasAssertions();
    mock.onGet().reply(200, officeSections);
    return store.dispatch(loadOfficeSections())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: LOAD_OFFICE_SECTIONS_REQUEST
        });
      });
  });

  it('should dispatch LOAD_OFFICE_SECTIONS_SUCCESS when loadOfficeSections called successfully', () => {
    expect.hasAssertions();
    mock.onGet().reply(200, officeSections);
    return store.dispatch(loadOfficeSections())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: officeSections,
          type: LOAD_OFFICE_SECTIONS_SUCCESS
        });
      });
  });

  it('should dispatch LOAD_OFFICE_SECTIONS_FAILURE when OfficeSections are not loaded', () => {
    expect.hasAssertions();
    mock.onGet().reply(401);
    return store.dispatch(loadOfficeSections()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 401',
        type: LOAD_OFFICE_SECTIONS_FAILURE
      });
    });
  });
});
