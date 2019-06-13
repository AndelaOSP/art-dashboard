import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loadOfficeLocations, loadOfficeBlocks, createOfficeBlock, loadCentreOfficeBlocks } from '../../_actions/officeLocations.actions';

import officeLocations from '../../_mock/officeLocations';
import officeBlocks from '../../_mock/officeBlocks';

import constants from '../../_constants';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  LOAD_OFFICE_BLOCK_SUCCESS,
  LOAD_OFFICE_BLOCK_FAILURE,
  CREATE_OFFICE_BLOCK_SUCCESS,
  CREATE_OFFICE_BLOCK_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Centres Action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'andela-centres/?page=1&page_size=10';

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_LOCATIONS_REQUEST when loadOfficeLocations is called', () => {
    mock.onGet(url).reply(200, officeLocations.results);
    return store.dispatch(loadOfficeLocations(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_LOCATIONS_REQUEST
      });
    });
  });

  it('should dispatch LOAD_LOCATIONS_SUCCESS when loadOfficeLocations is called successfully', () => {
    mock.onGet(url).reply(200, officeLocations.results);
    return store.dispatch(loadOfficeLocations(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: officeLocations.results,
        type: LOAD_LOCATIONS_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_LOCATIONS_FAILURE when loadOfficeLocations is unsuccessful', () => {
    mock.onGet(url).reply(400, 'Could not load Andela centres');
    return store.dispatch(loadOfficeLocations(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 400'),
        type: LOAD_LOCATIONS_FAILURE
      });
    });
  });

  it('should dispatch LOAD_OFFICE_BLOCK_SUCCESS when loadOfficeLocations is called successfully', () => {
    mock.onGet('office-blocks/?page=1&page_size=10').reply(200, officeLocations.results);
    return store.dispatch(loadOfficeBlocks(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: officeLocations.results,
        type: LOAD_OFFICE_BLOCK_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_OFFICE_BLOCK_SUCCESS when loadCentreOfficeBlocks is called successfully', () => {
    mock.onGet().reply(200, officeBlocks.results);
    return store.dispatch(loadCentreOfficeBlocks(2)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: officeBlocks.results,
        type: LOAD_OFFICE_BLOCK_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_OFFICE_BLOCK_FAILURE when loadOfficeBlocks is unsuccessful', () => {
    mock.onGet('office-blocks/?page=1&page_size=10').reply(400, 'Could not office blocks');
    return store.dispatch(loadOfficeBlocks(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 400'),
        type: LOAD_OFFICE_BLOCK_FAILURE
      });
    });
  });

  it('should dispatch CREATE_OFFICE_BLOCK_SUCCESS when createOfficeBlock is called successfully', () => {
    mock.onPost('office-blocks').reply(200, officeLocations.results);
    return store.dispatch(createOfficeBlock({})).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: officeLocations.results,
        type: CREATE_OFFICE_BLOCK_SUCCESS
      });
    });
  });

  it('should dispatch CREATE_OFFICE_BLOCK_FAILURE when createOfficeBlock is unsuccessful', () => {
    mock.onPost('office-blocks').reply(400, 'Error creating Block');
    return store.dispatch(createOfficeBlock({})).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_OFFICE_BLOCK_FAILURE,
        payload: 'Error creating Block'
      });
    });
  });
});
