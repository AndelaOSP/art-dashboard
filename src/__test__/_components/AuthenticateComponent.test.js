import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Authenticate from '../../_components/AuthenticateComponent';

describe('<AuthenticateComponent /> tests', () => {
  const props = {
    location: {},
    component: jest.fn(),
    isAuthenticated: true,
    render: jest.fn()
  };

  const wrapper = shallow(<Authenticate {...props} />);

  it('renders Route component', () => {
    expect(wrapper.find('Route').exists()).toBe(true);
  });
});
