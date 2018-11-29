import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserFilterButton from '../../components/User/UserFilter';

import { userFilters } from '../../_mock/filters';

describe('Renders <CheckboxComponent /> tests', () => {
  const props = {
    limit: 10,
    hideHeader: false,
    activePage: 1,
    loadUsers: jest.fn(),
    isLoading: false,
    filterData: userFilters,
    filterSelection: jest.fn(),
    selected: {}
  };

  const wrapper = shallow(<UserFilterButton {...props} />);

  it('renders FilterButton', () => {
    expect(wrapper.find('FilterButton').length).toEqual(1);
  });

  it('renders FilterComponent', () => {
    expect(wrapper.find('FilterComponent').length).toEqual(2);
  });
});
