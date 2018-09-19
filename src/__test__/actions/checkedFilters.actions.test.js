import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import filterSelection from '../../_actions/checkedFilters.actions';

const { FILTER_SELECTED } = constants;

const mockStore = configureMockStore([thunk]);
let store;

describe('Checked filters action tests', () => {
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch FILTER_SELECTED', () => {
    store.dispatch(filterSelection({}, ''));

    expect(store.getActions())
      .toContainEqual({
        type: FILTER_SELECTED,
        filterType: '',
        selection: {}
      });
  });
});
