import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createDepartment, loadDepartmentDetail, loadDepartments } from '../../_actions/departments.actions';

import departments from '../../_mock/departments';

import constants from '../../_constants';

const {
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_FAILURE,
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  LOAD_DEPARTMENT_DETAIL_REQUEST,
  LOAD_DEPARTMENT_DETAIL_SUCCESS,
  LOAD_DEPARTMENT_DETAIL_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Centres Action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'departments';

  store = mockStore({});

  const departmentToCreate = {
    name: 'My Department',
    asset_category: 1
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch CREATE_DEPARTMENT_REQUEST  when createDepartment is called', () => {
    mock.onPost('departments').reply(200, departmentToCreate);
    return store.dispatch(createDepartment(departmentToCreate)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_DEPARTMENT_REQUEST
      });
    });
  });

  it('should dispatch CREATE_DEPARTMENT_SUCCESS  when createDepartment is called successfully', () => {
    mock.onPost('departments').reply(200, departmentToCreate);
    return store.dispatch(createDepartment(departmentToCreate)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: departmentToCreate
      });
    });
  });

  it('should dispatch CREATE_DEPARTMENT_FAILURE when createDepartment is unsuccessful', () => {
    mock.onPost('departments').reply(400, 'Error creating Department');
    return store.dispatch(createDepartment(departmentToCreate)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_DEPARTMENT_FAILURE,
        payload: 'Error creating Department'
      });
    });
  });

  it('should dispatch LOAD_DEPARTMENTS_REQUEST when loadDepartments is called', () => {
    mock.onGet(url).reply(200, departments.results);
    return store.dispatch(loadDepartments(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_DEPARTMENTS_REQUEST
      });
    });
  });

  it('should dispatch LOAD_DEPARTMENTS_SUCCESS when loadDepartments is called successfully', () => {
    mock.onGet('departments').reply(200, departments);
    return store.dispatch(loadDepartments()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: departments.results,
        type: LOAD_DEPARTMENTS_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_DEPARTMENTS_FAILURE when loadDepartments is unsuccessful', () => {
    mock.onGet(url).reply(400);
    return store.dispatch(loadDepartments(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: LOAD_DEPARTMENTS_FAILURE
      });
    });
  });

  it('should dispatch LOAD_DEPARTMENT_DETAIL_REQUEST  when loadDepartmentDetail is called', () => {
    mock.onGet(`departments/${departments.results[0].id}`).reply(200, departments.results[0]);
    return store.dispatch(loadDepartmentDetail(departments.results[0].id)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_DEPARTMENT_DETAIL_REQUEST
      });
    });
  });

  it('should dispatch LOAD_DEPARTMENT_DETAIL_SUCCESS  when loadDepartmentDetail is called successfully', () => {
    mock.onGet(`departments/${departments.results[0].id}`).reply(200, departments.results[0]);
    return store.dispatch(loadDepartmentDetail(departments.results[0].id)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_DEPARTMENT_DETAIL_SUCCESS,
        payload: departments.results[0]
      });
    });
  });

  it('should dispatch LOAD_DEPARTMENT_DETAIL_FAILURE when loadDepartmentDetail is unsuccessful', () => {
    mock.onGet(`departments/${departments.results[0].id}`).reply(400);
    return store.dispatch(loadDepartmentDetail(departments.results[0].id)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_DEPARTMENT_DETAIL_FAILURE,
        payload: 'Request failed with status code 400'
      });
    });
  });
});
