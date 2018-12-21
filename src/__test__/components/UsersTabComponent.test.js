import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UsersTabComponent from '../../components/User/UsersTabComponent';

describe('Renders <UsersTabComponent /> tests', () => {
  const props = {
    panes: []
  };
  const wrapper = shallow(<UsersTabComponent {...props} />);

  it('renders TabsComponent', () => {
    expect(wrapper.find('TabsComponent').exists()).toEqual(true);
  });
});
