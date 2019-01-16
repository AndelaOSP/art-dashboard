import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILURE,
  CREATE_LOCATIONS_REQUEST
} = constants;

export default (state = initialState.officeLocations, action) => {
  switch (action.type) {
    case LOAD_LOCATIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_LOCATIONS_SUCCESS:
      return {
        ...state,
        locationCount: action.payload.count,
        locationList: action.payload.results,
        isLoading: false
      };

    case LOAD_LOCATIONS_FAILURE:
      return {
        ...state,
        error: action.payload.message || 'Oops, something went wrong',
        isLoading: false
      };

    case RESET_STATUS_MESSAGE:
      return {
        ...state,
        error: ''
      };
    case CREATE_LOCATIONS_SUCCESS:
      return {
        ...state,
        locationCount: state.locationCount + 1,
        locationList: state.locationList.concat(action.payload),
        isLoading: false
      };
    case CREATE_LOCATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case CREATE_LOCATIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
};
