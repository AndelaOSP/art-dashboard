import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserDetailsComponent from '../components/UserDetailsComponent';
import UserDetailsContainer from '../components/UserDetailsContainer';
import SideMenuComponent from '../_components/SideMenuComponent';

const props = {
  loadUsers: jest.fn(),
  hasError: false,
  isLoading: false,
  usersCount: 10,
  errorMessage: '',
  users: []
};

describe('Renders <UserDetailsContainer /> correctly', () => {
  const wrapper = shallow(<UserDetailsContainer.WrappedComponent {...props} />);

  it('renders the UserDetailsComponent component', () => {
    expect(wrapper.find(UserDetailsComponent).length).toBe(1);
  });

  it('renders the UserDetailsComponent component', () => {
    expect(wrapper.find(SideMenuComponent).length).toBe(1);
  });
});

