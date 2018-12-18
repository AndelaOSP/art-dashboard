import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import UsersComponent from '../../components/User/UsersComponent';
import UserHeader from '../../components/User/UserHeader';
import users from '../../_mock/users';

jest.mock('../../_components/NavBarContainer', () => () => <div />);

describe('UsersComponent tests', () => {
  let props;
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
  });

  it('renders without errors with minimal props', () => {
    expect(() => shallow(<UsersComponent {...props} />)).not.toThrow();
  });

  it('renders the UserHeader component', () => {
    const wrapper = shallow(<UsersComponent {...props} />);
    expect(wrapper).toContainReact(<UserHeader limit={10} name="users" />);
  });

  it('renders the StatusMessageComponent', () => {
    const wrapper = shallow(
      <UsersComponent
        {...props}
        errorMessage="Error!"
        hasError
      />
    );
    expect(wrapper.find('StatusMessageComponent')).toHaveClassName('error-status');
  });

  it('renders the not found component', () => {
    const wrapper = shallow(<UsersComponent {...props} activePage={2} />);
    expect(wrapper.find('ItemsNotFoundComponent')).toExist();
  });

  it('renders the UsersContent', () => {
    const wrapper = shallow(<UsersComponent {...props} />);
    expect(wrapper.find('UsersContent')).toHaveProp('hasUsers', true);
  });

  it('executes the handlePaginationChange function', () => {
    const wrapper = shallow(<UsersComponent {...props} activePage={3} />);
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    wrapper.instance().handlePaginationChange({}, {});
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleRowChange when a  number of rows are selected', () => {
    const wrapper = shallow(<UsersComponent {...props} />);
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    wrapper.instance().handleRowChange({}, {});
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
