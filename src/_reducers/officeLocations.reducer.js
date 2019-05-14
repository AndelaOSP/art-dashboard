import constants from '../_constants';
import initialState from './initialState';
import findLocationIndex from '../_utils/updateUnpaginatedObject';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE,
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  UPDATE_ANDELA_CENTRE_REQUEST,
  UPDATE_ANDELA_CENTRE_SUCCESS,
  UPDATE_ANDELA_CENTRE_FAILURE,
  LOAD_OFFICE_BLOCK_REQUEST,
  LOAD_OFFICE_BLOCK_SUCCESS,
  LOAD_OFFICE_BLOCK_FAILURE,
  CREATE_OFFICE_BLOCK_REQUEST,
  CREATE_OFFICE_BLOCK_SUCCESS,
  CREATE_OFFICE_BLOCK_FAILURE
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

    case LOAD_OFFICE_BLOCK_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_OFFICE_BLOCK_SUCCESS:
      return {
        ...state,
        blockCount: action.payload.count,
        blockList: action.payload.results,
        isLoading: false
      };

    case LOAD_OFFICE_BLOCK_FAILURE:
      return {
        ...state,
        error: action.payload.message || 'Oops, something went wrong',
        isLoading: false
      };

    case CREATE_OFFICE_BLOCK_SUCCESS:
      return {
        ...state,
        blockCount: state.blockCount + 1,
        blockList: state.blockList.concat(action.payload),
        isLoading: false,
        createSuccess: 'Block added successfully.',
        createFailure: ''
      };

    case CREATE_OFFICE_BLOCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        createSuccess: '',
        createFailure: action.payload,
        error: action.payload.message || 'Oops, something went wrong'
      };

    case CREATE_OFFICE_BLOCK_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
};
