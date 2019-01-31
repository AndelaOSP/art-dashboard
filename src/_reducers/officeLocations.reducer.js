import constants from '../_constants';
import initialState from './initialState';
import findLocationIndex from '../_utils/updateUnpaginatedObject';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILURE,
  CREATE_LOCATIONS_REQUEST,
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  UPDATE_ANDELA_CENTRE_REQUEST,
  UPDATE_ANDELA_CENTRE_SUCCESS,
  UPDATE_ANDELA_CENTRE_FAILURE
} = constants;

const updateLocationList = (location, locationList) => {
  const locationIndex = findLocationIndex(location, locationList);

  if (!locationIndex) {
    return locationList;
  }

  locationList[locationIndex.index] = location;

  return locationList;
};

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

    case UPDATE_ANDELA_CENTRE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE_ANDELA_CENTRE_SUCCESS:
      return {
        ...state,
        locationList: updateLocationList(action.payload, state.locationList),
        isLoading: false,
        updateSuccess: 'Centre updated successfully.',
        updateError: ''
      };

    case UPDATE_ANDELA_CENTRE_FAILURE:
      return {
        ...state,
        isLoading: false,
        updateSuccess: '',
        updateError: action.payload
      };

    case RESET_STATUS_MESSAGE:
      return {
        ...state,
        error: '',
        successMessage: '',
        updateSuccess: '',
        updateError: '',
        createSuccess: '',
        createFailure: ''
      };

    case CREATE_LOCATIONS_SUCCESS:
      return {
        ...state,
        locationCount: state.locationCount + 1,
        locationList: state.locationList.concat(action.payload),
        isLoading: false,
        createSuccess: 'Centre added successfully.',
        createFailure: ''
      };

    case CREATE_LOCATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        createSuccess: '',
        createFailure: action.payload
      };

    case CREATE_LOCATIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_COUNTRIES_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload
      };

    case LOAD_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.payload.message || 'Oops, something went wrong',
        isLoading: false
      };

    default:
      return state;
  }
};
