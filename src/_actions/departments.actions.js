import axios from 'axios';
import constants from '../_constants';
import { handleAxiosErrors } from '../_utils/ajax';

const {
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_FAILURE,
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  RESET_STATUS_MESSAGE,
  LOAD_DEPARTMENT_DETAIL_REQUEST,
  LOAD_DEPARTMENT_DETAIL_SUCCESS,
  LOAD_DEPARTMENT_DETAIL_FAILURE
} = constants;

export const createDepartment = data => (dispatch) => {
  dispatch({ type: CREATE_DEPARTMENT_REQUEST });

  return axios
    .post('departments', data)
    .then((response) => {
      dispatch({ type: CREATE_DEPARTMENT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      const message = retrieveErrorMessage(error);
      dispatch({ type: CREATE_DEPARTMENT_FAILURE, payload: message });
    });
};

const retrieveErrorMessage = (error) => {
  const axiosError = handleAxiosErrors(error);
  if (axiosError.name) {
    return axiosError.name.shift();
  }

  return axiosError;
};

export const loadDepartments = () => (dispatch) => {
  dispatch({ type: LOAD_DEPARTMENTS_REQUEST });
  return axios
    .get('departments')
    .then((response) => {
      dispatch({ type: LOAD_DEPARTMENTS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: LOAD_DEPARTMENTS_FAILURE, payload: error.message });
    });
};

export const resetMessage = () => ({ type: RESET_STATUS_MESSAGE });

export const loadDepartmentDetail = departmentId => (
  (dispatch) => {
    dispatch({ type: LOAD_DEPARTMENT_DETAIL_REQUEST });
    return axios.get(`departments/${departmentId}`)
      .then((response) => {
        dispatch({
          type: LOAD_DEPARTMENT_DETAIL_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_DEPARTMENT_DETAIL_FAILURE,
          payload: error.message
        });
      });
  }
);
