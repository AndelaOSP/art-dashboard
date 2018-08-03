// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import { loadModelNumbers } from '../../_actions/modelNumbers.actions';

// constants
import constants from '../../_constants';

const { LOAD_ASSET_MODEL_NUMBERS } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Model Numbers action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'asset-models/';
  store = mockStore({});
  const expectedActions = [
    {
      type: LOAD_ASSET_MODEL_NUMBERS
    }
  ];

  it('should dispatch LOAD_ASSET_MODEL_NUMBERS when loadModelNumbers called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          id: 6,
          model_number: 'Mircosoft LX-Lifechat-7000',
          make_label: 'Mircosoft'
        }
      ]
    );
    return store.dispatch(loadModelNumbers()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
});
