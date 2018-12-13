import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import TabsComponent from '../../components/common/TabsComponent';

describe('Renders <TabsComponent /> tests', () => {
  const props = {
    panes: []
  };
  const wrapper = shallow(<TabsComponent {...props} />);

  it('renders TabsComponent', () => {
    expect(wrapper.find('Tab').exists()).toEqual(true);
  });
});
