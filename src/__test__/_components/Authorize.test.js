import { shallow } from 'enzyme/build';
import expect from 'expect';
import React from 'react';
import Authorize from '../../_components/AccessControl/Authorize';

import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

describe('<Authorize /> tests', () => {
  const props = {
    history: {
      push: jest.fn()
    },
    AuthComponent: () => <span />,
    handleLogout: jest.fn(),
    isAuthenticated: false
  };

  const wrapper = shallow(<Authorize {...props} />);

  it('renders ArtModal component when user is not admin', () => {
    expect(wrapper.find('ArtModal').exists()).toBe(true);
  });

  it('renders component when user is an admin', () => {
    wrapper.setProps({ isAuthenticated: true });

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
