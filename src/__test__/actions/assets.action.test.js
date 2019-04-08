// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getAssetsAction,
  setActivePage,
  uploadAssets,
  downloadFile,
  exportAssetsAction
} from '../../_actions/assets.action';
import assets from '../../_mock/assets';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const url = 'upload/';

describe('Asset Types action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_ASSETS_STARTS when getAssetsActions starts being executed', () => {
    mock.onGet().reply(200, assets);
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        isLoading: true,
        type: 'LOAD_ASSETS_STARTS'
      });
    });
  });

  it('should dispatch LOAD_ASSETS_SUCCESS when getAssetsActions is called successfully', () => {
    mock.onGet().reply(200, assets);
    return store.dispatch(getAssetsAction(1)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: assets,
        type: 'LOAD_ASSETS_SUCCESS',
        status: '',
        filters: {}
      });
    });
  });

  it('should dispatch SET_ACTIVE_PAGE when setActivePage is called successfully', () => {
    mock.onGet().reply(200, 1);
    store.dispatch(setActivePage(1));
    expect(store.getActions()).toContainEqual({
      payload: 1,
      type: 'SET_ACTIVE_PAGE'
    });
  });

  it('should dispatch LOAD_ASSETS_FAILURE when getAssetsAction returns an error', () => {
    mock.onGet().reply(400,
      { message: 'error not found' }
    );
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'LOAD_ASSETS_FAILURE',
        status: ''
      });
    });
  });

  it('should dispatch UPLOAD_ASSETS_STARTS, when uploadAssets is called', () => {
    const testFile = new File([''], 'filename.csv');
    const expectedFormData = new FormData();
    expectedFormData.append('file', testFile);

    mock.onPost(url, testFile).reply(200);
    return store.dispatch(uploadAssets(testFile)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'UPLOAD_ASSETS_STARTS',
        isUpLoading: true
      });
    });
  });

  it('should dispatch UPLOAD_ASSETS_FAILURE, when uploadAssets is called unsuccessfully', () => {
    const testFile = new File([''], 'filename.csv');
    const expectedFormData = new FormData();
    expectedFormData.append('file', testFile);

    mock.onPost(url, testFile).reply(500);
    return store.dispatch(uploadAssets(testFile)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 500',
        type: 'UPLOAD_ASSETS_FAILURE'
      });
    });
  });

  it('should dispatch UPLOAD_ASSETS_SUCCESS, when uploadAssets partially successful', () => {
    const testFile = new File([''], 'filename.csv');
    const expectedFormData = new FormData();
    expectedFormData.append('file', testFile);

    const expectedResponse = {
      fail: 'Some assets were skipped. Download the skipped assets file from',
      file: 'http://127.0.0.1:8000/api/v1/skipped/',
      success: 'Asset import completed successfully Assets that have not been imported have been written to a file.'
    };

    mock.onPost(url, testFile).reply(200, expectedResponse);
    return store.dispatch(uploadAssets(testFile)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: expectedResponse,
        type: 'UPLOAD_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch UPLOAD_ASSETS_STARTS, when downloadFile is called', () => {
    const testurl = 'skipped/';
    mock.onGet(testurl).reply(200);
    return store.dispatch(downloadFile(testurl)).then(() => {
      expect(store.getActions()).toContainEqual({
        isUpLoading: true,
        type: 'UPLOAD_ASSETS_STARTS'
      });
    });
  });

  it('should dispatch DOWNLOAD_FILE_FAILURE, when downloadFile is called unsuccessfully', () => {
    const testurl = 'skipped/';
    mock.onGet(testurl).reply(400);
    return store.dispatch(downloadFile(testurl)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'DOWNLOAD_FILE_FAILURE'
      });
    });
  });

  it('should dispatch DOWNLOAD_FILE_SUCCESS, when uploadAssets partially successful', () => {
    const testurl = 'skipped/';
    const expectedResponse = new Blob([{
      size: 15041,
      type: 'text/csv'
    }]);

    global.URL.createObjectURL = jest.fn();
    const downloadedFile = global.URL.createObjectURL(expectedResponse);
    mock.onGet().reply(200, downloadedFile);
    return store.dispatch(downloadFile(testurl)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: downloadedFile,
        type: 'DOWNLOAD_FILE_SUCCESS'
      });
    });
  });

  it('should dispatch EXPORT_ASSETS_SUCCESS, when exportAssetsAction is called', () => {
    const testurl = 'export-assets/';
    mock.onGet(testurl).reply(200, {});
    return store.dispatch(exportAssetsAction('allocated')).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'EXPORT_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch EXPORT_ASSETS_FAILURE, when exportAssetsAction is called', () => {
    mock.onGet().reply(400);
    return store.dispatch(exportAssetsAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'EXPORT_ASSETS_FAILURE'
      });
    });
  });
});
