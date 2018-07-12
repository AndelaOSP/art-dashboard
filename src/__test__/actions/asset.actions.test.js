// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import { createAsset, getAssetDetail } from '../../_actions/asset.actions';

// mock data
import asset from '../../_mock/asset';

// constants
import constants from '../../_constants';

const { CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  LOADING_ASSET,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_SUCCESS } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'manage-assets';
  store = mockStore({});

  const assetToBeCreated = {
    asset_code: 'AND/HS/0909',
    serial_number: '897832SWWS',
    model_number: 6
  };

  let expectedActions = [
    {
      type: CREATE_ASSET_SUCCESS,
      payload: asset
    },
    {
      type: CREATE_ASSET_FAIL
    }
  ];

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch CREATE_ASSET_SUCCESS when createAsset is called successfully', () => {
    mock.onPost(url, assetToBeCreated).reply(201,
      asset
    );
    return store.dispatch(createAsset(assetToBeCreated)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
    });
  });

  it('should dispatch CREATE_ASSET_FAIL when createAsset is unsuccessful', () => {
    mock.onPost(url, assetToBeCreated).reply(400);
    return store.dispatch(createAsset(assetToBeCreated)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[1].type);
    });
  });

  it('should dispatch LOAD_ASSET_SUCCESS when getAssetDetails is called successfully', () => {
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
    expectedActions = [
      { type: LOADING_ASSET },
      { type: LOAD_ASSET_SUCCESS }
    ];
    return store.dispatch(getAssetDetail()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('should dispatch LOAD_ASSET_FAILURE when getAssetDetail returns an error', () => {
    expectedActions = [
      { type: LOADING_ASSET },
      { type: LOAD_ASSET_FAILURE }
    ];
    mock.onGet().reply(400,
      { message: 'error not found' }
    );
    return store.dispatch(getAssetDetail()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });
});
