// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import {
  loadModelNumbers,
  createModelNumbers
} from '../../_actions/modelNumbers.actions';

// mock data
import { modelNumbers } from '../../_mock/modelNumbers';

// constants
import constants from '../../_constants';

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
  const url = 'asset-models/';
  store = mockStore({});

  const modelNumberToCreate = {
    model_number: 'MC-LF600',
    make_label: 'Make Label'
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_ASSET_MODEL_NUMBERS when loadModelNumbers called successfully', () => {
    mock.onGet(url).reply(200, modelNumbers);
    return store.dispatch(loadModelNumbers()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: modelNumbers,
        type: LOAD_ASSET_MODEL_NUMBERS
      });
    });
  });

  it('should dispatch CREATE_MODEL_NUMBER_SUCCESS when createModelNumbers called successfully', () => {
    mock.onPost(url, modelNumberToCreate).reply(201,
      modelNumberToCreate
    );
    return store.dispatch(createModelNumbers(modelNumberToCreate))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: modelNumberToCreate,
          type: CREATE_MODEL_NUMBER_SUCCESS
        });
      });
  });

  it('should dispatch CREATE_MODEL_NUMBER_FAILURE when createModelNumbers fails', () => {
    mock.onGet().reply(401);
    return store.dispatch(createModelNumbers({
      model_number: '',
      make_label: ''
    }))
      .then(() => {
        expect(store.getActions()[0].type).toContain(CREATE_MODEL_NUMBER_FAILURE);
      });
  });
});
