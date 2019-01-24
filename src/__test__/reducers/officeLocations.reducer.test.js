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
  RESET_STATUS_MESSAGE
} = constants;

const state = {
  locationCount: 0,
  locationList: [],
  isLoading: false,
  error: '',
  updateSuccess: '',
  updateError: ''
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
});
