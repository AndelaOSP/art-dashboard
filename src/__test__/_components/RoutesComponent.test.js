import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Routes from '../../_components/RoutesComponent';

import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

describe('<RoutesComponent /> tests', () => {
  const props = {
    history: {
      push: jest.fn()
    },
    checkAuthentication: jest.fn(),
    handleLogout: jest.fn(),
    isAdmin: jest.fn(),
    checkPropertyExists: jest.fn(),
    decodedToken: {
      admin: true
    }
  };

  const wrapper = shallow(<Routes {...props} />);

  it('renders Switch component', () => {
    expect(wrapper.find('Switch').exists()).toBe(true);
  });
});
