import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import UsersComponent from '../../components/User/UsersComponent';
import UserHeader from '../../components/User/UserHeader';
import users from '../../_mock/users';

jest.mock('../../_components/NavBarContainer', () => () => <div />);

describe('UsersComponent tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      loadUsers: jest.fn(),
      loadAllFilterValues: jest.fn(),
      resetUsers: jest.fn(),
      setActivePage: jest.fn(),
      usersCount: 1,
      activePage: 1,
      users: {
        page_1: users
      },
      hasError: false,
      errorMessage: '',
      isFiltered: false,
      resetMessage: jest.fn(),
      isLoading: false,
      entity: 'users'
    };
    wrapper = shallow(<UsersComponent {...props} />);
  });

  it('renders without errors with minimal props', () => {
    expect(() => wrapper).not.toThrow();
  });

  it('renders the UserHeader component', () => {
    expect(wrapper).toContainReact(<UserHeader limit={10} name="users" />);
  });

  it('renders the StatusMessageComponent', () => {
    const withError = shallow(
      <UsersComponent
        {...props}
        errorMessage="Error!"
        hasError
      />
    );
    expect(withError.find('StatusMessageComponent')).toHaveClassName('error-status');
  });

  it('renders the not found component', () => {
    const rendered = shallow(<UsersComponent {...props} activePage={2} />);
    expect(rendered.find('ItemsNotFoundComponent')).toExist();
  });

  it('renders the UsersContent', () => {
    expect(wrapper.find('UsersContent')).toHaveProp('hasUsers', true);
  });

  it('executes the handlePaginationChange function', () => {
    const rendered = shallow(<UsersComponent {...props} activePage={3} />);
    const handlePaginationChangeSpy = jest.spyOn(
      rendered.instance(), 'handlePaginationChange'
    );
    rendered.instance().handlePaginationChange({}, {});
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleRowChange when a  number of rows are selected', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    wrapper.instance().handleRowChange({}, {});
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calculates the total pages', () => {
    const results = wrapper.instance().getTotalPages();
    expect(results).toEqual(1);

    wrapper.setProps({ usersCount: 25 });
    const pages = wrapper.instance().getTotalPages();
    expect(pages).toEqual(3);
  });
});
