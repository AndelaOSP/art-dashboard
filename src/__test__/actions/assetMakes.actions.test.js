// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import { loadAssetMakes, addAssetMakes } from '../../_actions/assetMakes.actions';

// constants
import constants from '../../_constants';

const { LOAD_ASSET_MAKES_SUCCESS } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Makes action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'asset-makes';
  store = mockStore({});
  const expectedActions = [
    {
      type: LOAD_ASSET_MAKES_SUCCESS
    }
  ];

  it('should dispatch LOAD_ASSET_MAKES_SUCCESS when loadAssetMakes called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          id: 1,
          make_label: 'Mircosoft',
          asset_type: 'Headsets'
        }
      ]
    );
    return store.dispatch(loadAssetMakes()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });

  it('should dispatch ADD_ASSET_MAKE_SUCCESS when addAssetMakes is called successfully', () => {
    store = mockStore({ assetMakes: [] });
    const newMake = {
      asset_make: 'Test asset make',
      asset_type: 'Test asset type'
    };

    const expectedAction = [{
      type: 'ADD_ASSET_MAKE_SUCCESS',
      payload: { id: 5, make_label: 'Test asset make', asset_type: 'Test asset type' }
    }];

    mock
      .onPost(url, newMake)
      .reply(201,
        {
          id: 5,
          make_label: 'Test asset make',
          asset_type: 'Test asset type'
        }
      );
    return store.dispatch(addAssetMakes(newMake)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction[0]);
    });
  });
});
