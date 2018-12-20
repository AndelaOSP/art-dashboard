import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AssetsTab from '../../components/Assets/AssetsTabComponent';

describe('Renders <AssetsTabComponent /> tests', () => {
  const props = {
    status: ''
  };
  const wrapper = shallow(<AssetsTab {...props} />);

  it('renders TabsComponent', () => {
    expect(wrapper.find('TabsComponent').exists()).toEqual(true);
  });
});
