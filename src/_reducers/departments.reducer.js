import constants from '../_constants';
import initialState from './initialState';

const {
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_FAILURE,
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  RESET_STATUS_MESSAGE
} = constants;

export default (state = initialState.departments, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departmentsList: state.departmentsList.concat(action.payload),
        departmentsCount: state.departmentsList.length + 1,
        createSuccess: 'Department added successfully.',
        createFailure: '',
        isLoading: false
      };

    case CREATE_DEPARTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        createSuccess: '',
        createFailure: action.payload
      };

    case LOAD_DEPARTMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departmentsList: action.payload,
        departmentsCount: action.payload.length,
        isLoading: false
      };

    case LOAD_DEPARTMENTS_FAILURE:
      return {
        ...state,
        error: action.payload.message || 'Oops, something went wrong',
        isLoading: false
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
    default:
      return state;
  }
};
