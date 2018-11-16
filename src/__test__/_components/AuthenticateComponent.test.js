import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AuthenticateComponent } from '../../_components/Authentication/AuthenticateComponent';

import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

describe('<AuthenticateComponent.jsx /> tests', () => {
  const props = {
    isAuthenticated: true,
    isAdmin: false,
    checkAdmin: jest.fn(),
    handleLogout: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<AuthenticateComponent {...props} />);

  it('renders component when user is an admin', () => {
    wrapper.setProps({ isAdmin: true });

    expect(wrapper.find('ArtModal').exists()).toBe(false);
  });

  it('should call the checkAdmin function', () => {
    const checkAdminSpy = jest.spyOn(
      wrapper.instance(), 'checkAdmin'
    );

    wrapper.instance().checkAdmin();
    expect(checkAdminSpy.mock.calls.length).toEqual(1);
  });

  it('should call the handleLogout function', () => {
    const handleLogoutSpy = jest.spyOn(
      wrapper.instance(), 'handleLogout'
    );

    wrapper.instance().handleLogout();
    expect(handleLogoutSpy.mock.calls.length).toEqual(1);
  });
});
