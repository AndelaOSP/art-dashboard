import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import User from '../../_components/User/UserContainer';

const props = {
  loadUsers: jest.fn(),
  hasError: false,
  isLoading: false,
  usersCount: 10,
  errorMessage: '',
  users: [],
  handlePaginationChange: jest.fn(),
  handleRowChange: jest.fn()
};

describe('Renders <UserContainer /> correctly', () => {
  const wrapper = shallow(<User.WrappedComponent {...props} />);

  it('renders the UserComponent component', () => {
    expect(wrapper.find('UserComponent').length).toBe(1);
  });

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Users List');
  });

  it('calls the emptyUsersList function', () => {
    const emptyUsersListSpy = jest.spyOn(
      wrapper.instance(), 'emptyUsersList'
    );
    const event = {};
    const data = {};

    wrapper.instance().emptyUsersList(event, data);
    expect(emptyUsersListSpy.mock.calls.length).toEqual(1);
  });

  it('calls the shouldComponentUpdate function', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    const event = {};
    const data = {};

    wrapper.instance().shouldComponentUpdate(event, data);
    expect(shouldComponentUpdateSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handlePageTotal function when the next button is clicked', () => {
    const handlePageTotalSpy = jest.spyOn(
      wrapper.instance(), 'handlePageTotal'
    );

    wrapper.instance().handlePageTotal();
    expect(handlePageTotalSpy.mock.calls.length).toEqual(1);
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

  it('calls the handleRowChange function when the row dropdown is changed', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};

    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
