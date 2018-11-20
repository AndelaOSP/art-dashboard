import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AuthenticateComponent } from '../../_components/AccessControl/AuthenticateComponent';

describe('<AuthenticateComponent /> tests', () => {
  const props = {
    component: jest.fn(),
    isAuthenticated: true,
    render: jest.fn()
  };

  const wrapper = shallow(<AuthenticateComponent {...props} />);

  it('renders Route component', () => {
    expect(wrapper.find('Route').exists()).toBe(true);
  });
});
