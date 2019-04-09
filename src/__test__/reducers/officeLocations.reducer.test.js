import expect from 'expect';

import centresReducer from '../../_reducers/officeLocations.reducer';
import officeLocations from '../../_mock/officeLocations';
import constants from '../../_constants';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  UPDATE_ANDELA_CENTRE_REQUEST,
  UPDATE_ANDELA_CENTRE_SUCCESS,
  UPDATE_ANDELA_CENTRE_FAILURE,
  RESET_STATUS_MESSAGE,
  LOAD_OFFICE_BLOCK_REQUEST,
  LOAD_OFFICE_BLOCK_SUCCESS,
  LOAD_OFFICE_BLOCK_FAILURE,
  CREATE_OFFICE_BLOCK_REQUEST,
  CREATE_OFFICE_BLOCK_SUCCESS,
  CREATE_OFFICE_BLOCK_FAILURE
} = constants;

const state = {
  locationCount: 0,
  locationList: [],
  isLoading: false,
  error: '',
  updateSuccess: '',
  updateError: '',
  blockCount: 0,
  blockList: []
};

const action = {
  payload: {
    results: officeLocations.results,
    count: officeLocations.count
  }
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(centresReducer(state, {})).toEqual(state);
  });

  it('should handle LOAD_LOCATIONS_REQUEST', () => {
    action.type = LOAD_LOCATIONS_REQUEST;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      isLoading: true
    }));
  });

  it('should handle LOAD_LOCATIONS_SUCCESS', () => {
    action.type = LOAD_LOCATIONS_SUCCESS;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      locationCount: 2,
      locationList: action.payload.results,
      isLoading: false
    }));
  });

  it('should handle LOAD_LOCATIONS_FAILURE', () => {
    action.type = LOAD_LOCATIONS_FAILURE;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      isLoading: false
    }));
  });

  it('should handle UPDATE_ANDELA_CENTRE_REQUEST', () => {
    action.type = UPDATE_ANDELA_CENTRE_REQUEST;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      isLoading: true
    }));
  });

  it('should handle UPDATE_ANDELA_CENTRE_SUCCESS', () => {
    action.type = UPDATE_ANDELA_CENTRE_SUCCESS;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      isLoading: false,
      updateError: '',
      updateSuccess: 'Centre updated successfully.'
    }));
  });

  it('should handle UPDATE_ANDELA_CENTRE_FAILURE', () => {
    expect(centresReducer(state, {
      type: UPDATE_ANDELA_CENTRE_FAILURE,
      payload: 'Could not update the centre.'
    }))
      .toEqual(expect.objectContaining({
        isLoading: false,
        updateError: 'Could not update the centre.',
        updateSuccess: ''
      }));
  });

  it('should handle RESET_STATUS_MESSAGE', () => {
    action.type = RESET_STATUS_MESSAGE;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: '',
      successMessage: '',
      updateError: '',
      updateSuccess: ''
    }));
  });

  it('should handle LOAD_OFFICE_BLOCK_REQUEST', () => {
    action.type = LOAD_OFFICE_BLOCK_REQUEST;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: '',
      updateError: '',
      updateSuccess: '',
      isLoading: true,
      locationCount: 0,
      locationList: []
    }));
  });

  it('should handle LOAD_OFFICE_BLOCK_SUCCESS', () => {
    action.type = LOAD_OFFICE_BLOCK_SUCCESS;
    action.payload = {
      count: 0,
      results: []
    };

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: '',
      updateError: '',
      updateSuccess: '',
      isLoading: false,
      blockCount: 0,
      blockList: []
    }));
  });

  it('should handle LOAD_OFFICE_BLOCK_FAILURE', () => {
    action.type = LOAD_OFFICE_BLOCK_FAILURE;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: 'Oops, something went wrong',
      updateError: '',
      updateSuccess: '',
      isLoading: false,
      blockCount: 0,
      blockList: []
    }));
  });

  it('should handle CREATE_OFFICE_BLOCK_SUCCESS', () => {
    action.type = CREATE_OFFICE_BLOCK_SUCCESS;
    action.payload = {
      id: 1,
      name: 'Block Q',
      location: 4
    };

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: '',
      updateError: '',
      updateSuccess: '',
      isLoading: false,
      blockCount: 1,
      blockList: [{
        id: 1,
        name: 'Block Q',
        location: 4
      }],
      createSuccess: 'Block added successfully.',
      createFailure: ''
    }));
  });

  it('should handle CREATE_OFFICE_BLOCK_FAILURE', () => {
    action.type = CREATE_OFFICE_BLOCK_FAILURE;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: 'Oops, something went wrong',
      updateError: '',
      updateSuccess: '',
      isLoading: false,
      blockCount: 0,
      blockList: []
    }));
  });

  it('should handle CREATE_OFFICE_BLOCK_REQUEST', () => {
    action.type = CREATE_OFFICE_BLOCK_REQUEST;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      error: '',
      updateError: '',
      updateSuccess: '',
      isLoading: true,
      locationCount: 0,
      locationList: []
    }));
  });
});
