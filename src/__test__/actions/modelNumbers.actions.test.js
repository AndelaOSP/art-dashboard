// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import {
  loadModelNumbers,
  createModelNumbers
} from '../../_actions/modelNumbers.actions';

const {
  LOAD_ASSET_MODEL_NUMBERS,
  CREATE_MODEL_NUMBER_SUCCESS,
  CREATE_MODEL_NUMBER_FAILURE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Model Numbers action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers';
  store = mockStore({});
  const expectedActions = [
    { type: LOAD_ASSET_MODEL_NUMBERS },
    { type: CREATE_MODEL_NUMBER_SUCCESS },
    { type: CREATE_MODEL_NUMBER_FAILURE }
  ];
  const newModel = {
    make_label: 'Sollatex',
    model_number: 'Sollatex GT89'
  };

  afterEach(() => {
    store = mockStore({});
    mock.reset();
    mock.restore();
  });

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

  it('should dispatch CREATE_MODEL_NUMBER_SUCCESS when createModelNumbers called successfully', () => {
    mock.onPost(url, newModel).reply(201,
      [
        {
          id: 7,
          model_number: 'Sollatex GT89',
          make_label: 'Sollatex'
        }
      ]
    );
    return store.dispatch(createModelNumbers(newModel)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[1].type);
    });
  });
});
