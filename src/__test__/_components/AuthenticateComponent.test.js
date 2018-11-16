import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AuthenticateComponent, Authorized } from '../../_components/AuthenticateComponent';

import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

describe('<AuthenticateComponent /> tests', () => {
  const props = {
    component: jest.fn(),
    isAuthenticated: true,
    render: jest.fn()
  };

  const wrapper = shallow(<AuthenticateComponent {...props} />);

  it('renders Route component', () => {
    expect(wrapper.find('Route').exists()).toBe(true);
  });
});

describe('<Authorized /> tests', () => {
  const props = {
    history: {
      push: jest.fn()
    },
    component: jest.fn(),
    handleLogout: jest.fn(),
    isAdmin: false
  };

  const wrapper = shallow(<Authorized {...props} />);

  it('renders ArtModal component when user is not admin', () => {
    expect(wrapper.find('ArtModal').exists()).toBe(true);
  });

  it('renders component when user is an admin', () => {
    wrapper.setProps({ isAdmin: true });

    expect(wrapper.find('ArtModal').exists()).toBe(false);
  });

  it('should call the handleLogout function', () => {
    const handleLogoutSpy = jest.spyOn(
      wrapper.instance(), 'handleLogout'
    );

    wrapper.instance().handleLogout();
    expect(handleLogoutSpy.mock.calls.length).toEqual(1);
  });
});
