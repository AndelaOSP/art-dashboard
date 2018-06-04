import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import NavBarComponent from '../_components/NavBarComponent.jsx';

import localStorageMock from '../_mock/localStorage';

window.localStorage = localStorageMock;

describe('NavBarComponent is rendered', () => {

  const wrapper = shallow(<NavBarComponent />);

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
});
