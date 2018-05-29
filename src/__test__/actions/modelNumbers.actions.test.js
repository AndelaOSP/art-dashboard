// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { LOAD_ASSET_MODEL_NUMBERS } = constants;

// actions
import { loadModelNumbers } from '../../_actions/modelNumbers.actions';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Model Numbers action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});
  let expectedActions = [
    {
      type: LOAD_ASSET_MODEL_NUMBERS
    }
  ];

  it('should dispatch LOAD_ASSET_MODEL_NUMBERS when loadModelNumbers called successfully', () => {
    mock.onGet('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers').reply(200,
      [
        {
          "id": 6,
          "model_number": "Mircosoft LX-Lifechat-7000",
          "make_label": "Mircosoft"
        }
      ]
    );
    return store.dispatch(loadModelNumbers()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
})
