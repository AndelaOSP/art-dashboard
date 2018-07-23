import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { NavBarComponent } from '../../components/NavBarComponent';

import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

const props = {
  history: {
    push: jest.fn()
  },
  toggleVisibility: true
};

const wrapper = shallow(<NavBarComponent {...props} />);

describe('renders <NavBarComponent />', () => {
  it('should render navbar menu component', () => {
    expect(wrapper.find('Menu').length).toEqual(1);
  });

  it('should render hamburger icon', () => {
    expect(wrapper.find('#hamburger').length).toEqual(1);
  });

  it('should render andela banner icon', () => {
    expect(wrapper.find('#banner').length).toEqual(1);
  });

  it('should render search input', () => {
    expect(wrapper.find('#nav-search').length).toEqual(1);
  });

  it('should render notification icon', () => {
    expect(wrapper.find('#notification-icon').length).toEqual(1);
  });

  it('should render user drop-down menu', () => {
    expect(wrapper.find('Dropdown').length).toBe(1);
  });

  it('should call the handleLogout function when the logout button is clicked', () => {
    const handleLogoutSpy = jest.spyOn(
      wrapper.instance(), 'handleLogout'
    );
    wrapper.find('#logout').simulate('click');
    wrapper.instance().handleLogout();
    expect(handleLogoutSpy.mock.calls.length).toEqual(1);
  });

  it('toggle visibility of secondary menu', () => {
    const toggleVisibilitySpy = jest.spyOn(
      wrapper.instance(), 'toggleVisibility'
    );
    wrapper.find('#toggle-menu').simulate('click');
    wrapper.instance().toggleVisibility();
    expect(toggleVisibilitySpy.mock.calls.length).toEqual(1);
  });
});
