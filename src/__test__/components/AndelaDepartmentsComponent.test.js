import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import DepartmentsComponent from '../../components/Departments/DepartmentsComponent';
import departments from '../../_mock/departments';

describe('Renders <DepartmentsComponent /> correclty', () => {
  const props = {
    isLoading: false,
    departmentsCount: 2,
    loadDepartments: jest.fn(),
    departmentsList: departments
  };

  const wrapper = shallow(<DepartmentsComponent {...props} />);

  it('calls handleRowChange when a user tries to change row limit', () => {
    const handleRowChangeSpy = jest.spyOn(wrapper.instance(), 'handleRowChange');

    const event = {};
    const data = {};

    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls handlePaginationChange when next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(wrapper.instance(), 'handlePaginationChange');

    const event = {};
    const data = {};

    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the getTotalPages function when the next button is clicked', () => {
    const getTotalPagesSpy = jest.spyOn(wrapper.instance(), 'getTotalPages');
    wrapper.instance().getTotalPages();
    expect(getTotalPagesSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleToggleModal when a modal is opened or closed', () => {
    wrapper.setState({ modalOpen: false });

    wrapper.instance().handleToggleModal();
    expect(wrapper.state().modalOpen).toEqual(true);
  });

  it('renders cards', () => {
    expect(wrapper.find('Card'));
  });

  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });
});
