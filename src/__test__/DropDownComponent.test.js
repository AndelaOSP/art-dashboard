import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import DropdownComponent from '../_components/DropdownComponent';


describe('Asset Categories Component', () => {
  const wrapper = shallow(<DropdownComponent />);

  it('renders a span element', () => {
    expect(wrapper.find('span').length).toBe(1);
  });

  it('renders a Dropdown element', () => {
    expect(wrapper.find('Dropdown').length).toBe(1);
  });
});
