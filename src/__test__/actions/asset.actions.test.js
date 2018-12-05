// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import {
  createAsset,
  getAssetDetail,
  allocateAsset,
  reloadAssetDetail,
  unassignAsset,
  resetMessage,
  updateAsset
} from '../../_actions/asset.actions';

// mock data
import { asset } from '../../_mock/asset';
import assetMocks from '../../_mock/newAllocation';

// constants
import constants from '../../_constants';

const {
  CREATE_ASSET_REQUEST,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  UPDATE_ASSET_REQUEST,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  LOADING_ASSET,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_SUCCESS,
  NEW_ALLOCATION_SUCCESS,
  NEW_ALLOCATION_FAILURE,
  BUTTON_LOADING,
  UNASSIGN_FAILURE,
  UNASSIGN_SUCCESS,
  RESET_STATUS_MESSAGE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Action tests', () => {
  const mock = new MockAdapter(axios);
  const { uuid } = asset;
  const url = 'manage-assets';
  const url2 = `manage-assets/${uuid}`;

  store = mockStore({});

  const assetToBeCreated = {
    asset_code: 'AND/HS/0909',
    serial_number: '897832SWWS',
    model_number: 6
  };

  const assetUpdateData = {
    asset_code: 'AMTESTING35',
    model_number: 'LOGITECH',
    serial_number: 'AMTEST35',
    asset_location: 'Dojo'
  };

  let expectedActions = [
    {
      type: CREATE_ASSET_REQUEST
    },
    {
      type: CREATE_ASSET_SUCCESS,
      payload: asset
    },
    {
      type: CREATE_ASSET_FAIL,
      payload: new Error('Request failed with status code 400')
    }
  ];

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch CREATE_ASSET_REQUEST when createAsset is called', () => {
    mock.onPost(url, assetToBeCreated).reply(201, asset);
    return store.dispatch(createAsset(assetToBeCreated)).then(() => {
      expect(store.getActions()).toContainEqual(expectedActions[0]);
    });
  });

  it('should dispatch CREATE_ASSET_SUCCESS when createAsset is called successfully', () => {
    mock.onPost(url, assetToBeCreated).reply(201, asset);
    return store.dispatch(createAsset(assetToBeCreated)).then(() => {
      expect(store.getActions()).toContainEqual(expectedActions[1]);
    });
  });

  it('should dispatch CREATE_ASSET_FAIL when createAsset is unsuccessful', () => {
    mock.onPost(url, assetToBeCreated).reply(400);
    return store.dispatch(createAsset(assetToBeCreated)).then(() => {
      expect(store.getActions()).toContainEqual(expectedActions[2]);
    });
  });

  it('should dispatch RESET_STATUS_MESSAGE', () => {
    store.dispatch(resetMessage());

    expect(store.getActions())
      .toContainEqual({ type: RESET_STATUS_MESSAGE });
  });

  it('should dispatch LOAD_ASSET_SUCCESS when getAssetDetails is called successfully', () => {
    const assetsToLoad = [
      {
        id: 1,
        asset_type: 'Headset',
        asset_code: 'AND/HS/0077',
        model_number: 'Microsoft Lifechat LX-6000'
      }
    ];

    mock.onGet().reply(200, assetsToLoad);
    expectedActions = [
      { type: LOADING_ASSET },
      { type: LOAD_ASSET_SUCCESS, payload: assetsToLoad }
    ];
    return store.dispatch(getAssetDetail('1')).then(() => {
      expect(store.getActions()).toContainEqual(expectedActions[0]);
      expect(store.getActions()).toContainEqual(expectedActions[1]);
    });
  });

  it('should dispatch LOAD_ASSET_FAILURE when getAssetDetail returns an error', () => {
    expectedActions = [
      { type: LOADING_ASSET },
      { type: LOAD_ASSET_FAILURE, payload: 'Request failed with status code 400' }
    ];
    mock.onGet().reply(400,
      { message: 'error not found' }
    );
    return store.dispatch(getAssetDetail('tfgu')).then(() => {
      expect(store.getActions()).toContainEqual(expectedActions[0]);
      expect(store.getActions()).toContainEqual(expectedActions[1]);
    });
  });

  it('should dispatch NEW_ALLOCATION_SUCCESS when allocateAsset is successfully called', () => {
    const serialNumber = 'SN1231';
    const newAssignment = assetMocks.assignAsset;
    const expectedPayload = assetMocks.newAllocation;
    const loadedAsset = assetMocks.assetDetails;

    mock.onPost().reply(201, expectedPayload);
    return store.dispatch(allocateAsset(newAssignment, serialNumber))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(BUTTON_LOADING);
        expect(store.getActions()[1].type).toEqual(NEW_ALLOCATION_SUCCESS);
        mock.onGet().reply(200, loadedAsset);
        return store.dispatch(reloadAssetDetail()).then(() => {
          expect(store.getActions()[3].type).toEqual(LOAD_ASSET_SUCCESS);
        });
      });
  });


  it('should dispatch NEW_ALLOCATION_FAILURE when allocateAsset gets an error', () => {
    mock.onPost().reply(401);
    return store.dispatch(allocateAsset()).then(() => {
      expect(store.getActions()[1].type).toEqual(NEW_ALLOCATION_FAILURE);
    });
  });

  it('should dispatch UNASSIGN_SUCCESS when unassignAsset is successfully called', () => {
    const serialNumber = 'SN1231';
    const newUnassignment = assetMocks.unassignAsset;
    const expectedPayload = assetMocks.unassignedAsset;
    const loadedAsset = assetMocks.assetDetails;

    mock.onPost().reply(200, expectedPayload);
    return store.dispatch(unassignAsset(newUnassignment, serialNumber))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(BUTTON_LOADING);
        expect(store.getActions()[1].type).toEqual(UNASSIGN_SUCCESS);
        mock.onGet().reply(200, loadedAsset);
        return store.dispatch(reloadAssetDetail(serialNumber)).then(() => {
          expect(store.getActions()[2].type).toEqual(LOAD_ASSET_SUCCESS);
        });
      });
  });

  it('should dispatch UNASSIGN_FAILURE when unassignAsset gets an error', () => {
    mock.onPost().reply(400);
    return store.dispatch(unassignAsset()).then(() => {
      expect(store.getActions()[1].type).toEqual(UNASSIGN_FAILURE);
    });
  });

  it('should dispatch UPDATE_ASSET_REQUEST when updateAsset is called', () => {
    mock.onPut(url2, assetUpdateData).reply(201, asset);
    return store.dispatch(updateAsset(uuid, assetUpdateData)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: UPDATE_ASSET_REQUEST
      });
    });
  });

  it('should dispatch UPDATE_ASSET_SUCCESS when updateAsset is called successfully', () => {
    mock.onPut(url2, assetUpdateData).reply(201, asset);
    return store.dispatch(updateAsset(uuid, assetUpdateData)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: asset,
        type: UPDATE_ASSET_SUCCESS
      });
    });
  });

  it('should dispatch UPDATE_ASSET_FAIL when updateAsset is unsuccessful', () => {
    mock.onPut(url2, assetUpdateData).reply(400);
    return store.dispatch(updateAsset(uuid, assetUpdateData)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 400'),
        type: UPDATE_ASSET_FAIL
      });
    });
  });
});
