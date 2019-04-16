import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { IncidenceReportsComponent } from '../components/IncidenceReportsComponent.jsx';

import incidenceReports from '../_mock/incidenceReports';

describe('IncidenceReportsComponent is rendered correctly', () => {
  const props = {
    loadIncidenceReports: jest.fn(),
    handlePaginationChange: jest.fn(),
    reports: incidenceReports,
    incidenceReportsCount: 1
  };

  const wrapper = shallow(<IncidenceReportsComponent {...props} />);

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Incidence Reports');
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders a Dropdown component', () => {
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });

  it('calls the handlePaginationChange function when the next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(wrapper.instance(), 'handlePaginationChange');
    const event = {};
    const data = {};
    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleRowChange function when the next button is clicked', () => {
    const handleRowChangeSpy = jest.spyOn(wrapper.instance(), 'handleRowChange');
    const event = {};
    const data = {};
    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
