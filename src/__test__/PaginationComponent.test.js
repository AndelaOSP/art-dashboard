import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PaginationComponent from '../components/common/PaginationComponent';

describe('renders <PaginationComponent /> correctly', () => {
  const wrapper = shallow(<PaginationComponent />);

  it('renders a Segment', () => {
    expect(wrapper.find('Segment').length).toBe(2);
  });

  it('renders a Pagination Component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders a Dropdown Component', () => {
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });
});
