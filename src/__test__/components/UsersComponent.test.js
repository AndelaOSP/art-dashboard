import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserComponent from '../../components/User/UserComponent';

import users from '../../_mock/users';

describe('Renders <UserComponent /> correctly when no errors or loading prop', () => {
  const props = {
    isLoading: false,
    activePage: 1,
    emptyUsersList: () => false,
    errorMessage: '',
    handlePageTotal: jest.fn(),
    loadUsers: jest.fn(),
    handlePaginationChange: jest.fn(),
    handleRowChange: jest.fn(),
    loadAllFilterValues: jest.fn(),
    resetUsers: jest.fn(),
    setActivePage: jest.fn(),
    loading: jest.fn(),
    users,
    usersCount: 0
  };

  const wrapper = shallow(<UserComponent {...props} />);

  it('calls the handlePaginationChange function when the next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handlePageTotal function when the next button is clicked', () => {
    const handlePageTotalSpy = jest.spyOn(
      wrapper.instance(), 'handlePageTotal'
    );
    wrapper.instance().handlePageTotal();
    expect(handlePageTotalSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleRowChange when a  number of rows are selected', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
