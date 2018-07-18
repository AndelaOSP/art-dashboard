import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import LoginComponent from '../components/LoginComponent';

import localStorageMock from '../_mock/localStorage';

window.localStorage = localStorageMock;

describe('Renders <LoginComponent /> correctly', () => {
  const props = {
    history: { push: jest.fn() }
  };
  const { WrappedComponent } = withRouter(connect()(LoginComponent));
  const wrapper = shallowWithStore(<WrappedComponent {...props} />, createMockStore(null));
  const andelaLogo = '/images/andela_logo_blue_landscape.png';
  const googleLogo = 'https://res.cloudinary.com/damc3mj5u/image/upload/v1526571608/google-logo_jjjjqs.svg';
  const result = {
    user: {
      displayName: 'User 1',
      email: 'user1@email.com',
      getIdToken: jest.fn()
    }
  };

  it('renders Google login button', () => {
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('#google-logo').prop('src')).toEqual(googleLogo);
  });

  it('renders Andela logo', () => {
    expect(wrapper.find('#andela-logo').prop('src')).toEqual(andelaLogo);
  });

  it('renders page welcome message', () => {
    expect(wrapper.find('#welcome-message').length).toBe(1);
  });

  it('should call the handleLogin function when the sign in button is clicked', () => {
    const handleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleLogin'
    );
    wrapper.find('Button').simulate('click');
    wrapper.instance().handleLogin();
    expect(handleLoginSpy.mock.calls.length).toEqual(1);
  });

  it('should call validateUser when user tries to log in', () => {
    const validateUserSpy = jest.spyOn(wrapper.instance(), 'validateUser');

    wrapper.find('Button').simulate('click');
    wrapper.instance().validateUser(result);

    expect(validateUserSpy.mock.calls.length).toEqual(1);
  });
});
