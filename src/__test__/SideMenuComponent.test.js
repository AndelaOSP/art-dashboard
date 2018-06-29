import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import SideMenuComponent from '../_components/SideMenuComponent';

describe('Renders <SideMenuComponent /> correctly', () => {
  const wrapper = shallow(<SideMenuComponent />);

  it('renders wrapper div', () => {
    expect(wrapper.find('.wrapper').length).toBe(1);
  });

  it('renders SidebarPushable component', () => {
    expect(wrapper.find('SidebarPushable').length).toBe(1);
  });

  it('renders links correctly', () => {
    expect(wrapper.find('Sidebar').dive()
      .find('Menu').dive()
      .find('MenuItem').length).toBe(8);
  });
});
