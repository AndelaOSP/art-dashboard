import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE
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

    default:
      return state;
  }
};
