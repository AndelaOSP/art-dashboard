import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import { loadAllFilterValues, loadAccordionValue } from '../../_actions/allFilterValues.actions';

import { allFilterValues } from '../../_mock/filters';

const {
  FETCH_FILTER_VALUES_START,
  FETCH_FILTER_VALUES_SUCCESS,
  ACTIVE_ACCORDION
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let mock;

describe('Filter Values Actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should handle FETCH_FILTER_VALUES_SUCCESS when values are loaded successfully', () => {
    mock.onGet().reply(200, allFilterValues);
    const expectedActions = [
      { type: FETCH_FILTER_VALUES_START },
      { type: FETCH_FILTER_VALUES_SUCCESS, filters: allFilterValues }
    ];
    return store.dispatch(loadAllFilterValues())
      .then(() => {
        expect(store.getActions()).toContainEqual(expectedActions[0]);
        expect(store.getActions()).toContainEqual(expectedActions[1]);
      });
  });
});

describe('Load Accordion', () => {
  it('should dispatch ACTIVE_ACCORDION when accordion is opened', () => {
    const expectedActions = {
      type: ACTIVE_ACCORDION
    };
    store.dispatch(loadAccordionValue(2));
    expect(store.getActions()[0].type).toEqual(expectedActions.type);
    expect(store.getActions()[0].index).toEqual(2);
  });
});
