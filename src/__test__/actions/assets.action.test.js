// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import { getAssetsAction } from '../../_actions/assets.action';

// constants
import constants from '../../_constants';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE, LOAD_ASSETS_STARTS } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Types action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});
  let expectedActions = [
    {
      type: LOAD_ASSETS_STARTS
    },
    {
      type: LOAD_ASSETS_SUCCESS
    }
  ];

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_ASSETS_SUCCESS when getAssetsActions is called successfully', () => {
    mock.onGet().reply(200,
      [
        {
          id: 1,
          asset_type: 'Headset',
          asset_code: 'AND/HS/0077',
          model_number: 'Microsoft Lifechat LX-6000'
        }
      ]
    );
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('should dispatch LOAD_ASSETS_FAILURE when getAssetsAction returns an error', () => {
    expectedActions = [
      {
        type: LOAD_ASSETS_STARTS
      },
      {
        type: LOAD_ASSETS_FAILURE
      }
    ];
    mock.onGet().reply(400,
      { message: 'error not found' }
    );
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });
});
