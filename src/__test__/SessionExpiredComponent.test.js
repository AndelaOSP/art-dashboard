import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { SessionExpiredComponent } from '../components/SessionExpiredComponent';
import localStorageMock from '../_mock/localStorage';

window.localStorage = localStorageMock;

describe('Renders <SessionExpiredComponent /> correctly', () => {
  const props = {
    expireSession: jest.fn(),
    sessionExpired: false,
    history: {},
    push: jest.fn()
  };
  const wrapper = shallow(<SessionExpiredComponent
    {...props}
  />);

  it('renders the ArtModal component if sessionExpired is true', () => {
    wrapper.setProps({ sessionExpired: true });
    expect(wrapper.find('ArtModal').length).toBe(1);
  });

  it('renders the a <p> element if sessionExpired is true', () => {
    wrapper.setProps({ sessionExpired: true });
    expect(wrapper.find('p').length).toBe(1);
  });

  it('renders Button component if sessionExpired is true', () => {
    wrapper.setProps({ sessionExpired: true });
    expect(wrapper.find('Button').length).toBe(1);
  });
});
