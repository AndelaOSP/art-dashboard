import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  RESET_USERS,
  SET_USERS_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE
} = constants;

export default (state = initialState.usersList, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        isLoading: action.isLoading,
        successMessage: '',
        errorMessage: ''
      };

    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [`page_${state.activePage}`]: action.payload.results
        },
        usersCount: action.payload.count,
        hasError: false,
        successMessage: 'Filter successfully applied',
        errorMessage: '',
        isFiltered: action.isFiltered
      };

    case LOAD_USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        successMessage: '',
        hasError: true
      };

    case RESET_STATUS_MESSAGE:
      return {
        ...state,
        successMessage: '',
        errorMessage: ''
      };

    case LOAD_ASSET_ASSIGNEE_USERS_SUCCESS:
      return {
        ...state,
        assetAsigneeUsers: action.payload
      };

    case RESET_USERS:
      return {
        ...state,
        users: {},
        isFiltered: false
      };

    case SET_USERS_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };

    default:
      return state;
  }
};
