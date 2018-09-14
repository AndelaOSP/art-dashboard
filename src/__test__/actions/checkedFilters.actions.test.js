import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import addCheckedFilter from '../../_actions/checkedFilters.actions';

const { ADD_CHECKED_FILTER } = constants;

const mockStore = configureMockStore([thunk]);
let store;

describe('Checked filters action tests', () => {
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch ADD_CHECKED_FILTER', () => {
    store.dispatch(addCheckedFilter());

    expect(store.getActions())
      .toContainEqual({
        type: ADD_CHECKED_FILTER
      });
  });
});
