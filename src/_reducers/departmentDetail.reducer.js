import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_DEPARTMENT_DETAIL_REQUEST,
  LOAD_DEPARTMENT_DETAIL_SUCCESS,
  LOAD_DEPARTMENT_DETAIL_FAILURE
} = constants;

export default (state = initialState.departmentDetail, action) => {
  switch (action.type) {
    case LOAD_DEPARTMENT_DETAIL_REQUEST:
      return {
        ...state,
        details: {},
        isLoading: true
      };

    case LOAD_DEPARTMENT_DETAIL_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoading: false
      };

    case LOAD_DEPARTMENT_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload || 'Oops, something went wrong',
        isLoading: false
      };

    default:
      return state;
  }
};
