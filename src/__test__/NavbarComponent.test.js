import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { NavBarComponent } from '../_components/NavBarComponent.jsx';

import localStorageMock from '../_mock/localStorage';

window.localStorage = localStorageMock;

describe('NavBarComponent is rendered', () => {
  const props = {
    history: { push: jest.fn() },
    toggleVisibility: true
  };
  const wrapper = shallow(<NavBarComponent {...props} />);

  it('renders a div element', () => {
    expect(wrapper.find('.navbar').length).toBe(1);
  });

  it('renders a Menu component', () => {
    expect(wrapper.find('Menu').length).toBe(1);
  });

  it('renders a Dropdown menu', () => {
    expect(wrapper.find('Dropdown').length).toBe(1);
  });

  it('renders a list layout Icon on the navbar', () => {
    expect(wrapper.find('Icon').length).toBe(1);
  });

  it('should call the handleLogout function when the sign in button is clicked', () => {
    const handleLogoutSpy = jest.spyOn(
      wrapper.instance(), 'handleLogout'
    );
    wrapper.find('#logout').simulate('click');
    wrapper.instance().handleLogout();
    expect(handleLogoutSpy.mock.calls.length).toEqual(1);
  });
});
