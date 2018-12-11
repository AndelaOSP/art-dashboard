import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SecurityUserComponent from '../../components/SecurityUser/SecurityUserComponent';

import { securityUsers } from '../../_mock/users';

describe('Renders <SecurityUserComponent /> correctly', () => {
  const props = {
    isLoading: false,
    activePage: 1,
    emptyUsersList: () => false,
    errorMessage: '',
    handlePageTotal: jest.fn(),
    loadSecurityUsers: jest.fn(),
    handlePaginationChange: jest.fn(),
    handleRowChange: jest.fn(),
    resetUsers: jest.fn(),
    setActivePage: jest.fn(),
    usersList: {
      page_1: securityUsers.results
    },
    usersCount: 0
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SecurityUserComponent {...props} />);
  });

  it('renders loader component', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').exists()).toBe(true);
  });

  it('renders the ItemsNotFoundComponent', () => {
    wrapper.setProps({ usersList: [] });
    expect(wrapper.find('ItemsNotFoundComponent').exists()).toBe(true);
  });

  it('renders TableRow component when security users exist', () => {
    expect(wrapper.find('TableRow').exists()).toBe(true);
  });

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

  it('calls retrieveSecurityUsers function', () => {
    const retrieveSecurityUsersSpy = jest.spyOn(
      wrapper.instance(), 'retrieveSecurityUsers'
    );
    const activePage = 1;
    const limit = 10;

    wrapper.instance().retrieveSecurityUsers(activePage, limit);
    expect(retrieveSecurityUsersSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state().securityUsers).toEqual([]);
    expect(wrapper.state().allDataFetched).toEqual(false);
  });
});
