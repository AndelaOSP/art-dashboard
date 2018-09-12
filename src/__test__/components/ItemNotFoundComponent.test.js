import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ItemsNotFoundComponent from '../../components/common/ItemsNotFoundComponent';

describe('ItemNotFoundComponent is rendered correctly', () => {
  const wrapper = shallow(<ItemsNotFoundComponent />);

  it('renders not found Image', () => {
    expect(wrapper.find('Image').length).toBe(1);
  });

  it('renders not found message', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('renders not found header message', () => {
    expect(wrapper.find('h2').length).toBe(1);
  });
});
