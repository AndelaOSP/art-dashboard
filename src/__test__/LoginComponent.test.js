import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import LoginComponent from '../components/LoginComponent';

import localStorageMock from '../_mock/localStorage';

window.localStorage = localStorageMock;


describe('Renders <LoginComponent /> correctly', () => {

  const { WrappedComponent } = withRouter(connect()(LoginComponent));
  const wrapper = shallowWithStore(<WrappedComponent />, createMockStore(null));

  const andelaLogo = 'http://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png';
  const googleLogo = 'http://res.cloudinary.com/damc3mj5u/image/upload/v1526571608/google-logo_jjjjqs.svg';

  it('renders page Container', () => {
    expect(wrapper.find('Container').length).toBe(1);
  });

  it('renders Google login button', () => {
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('#google-logo').prop('src')).toEqual(googleLogo);
  });

  it('renders Andela logo', () => {
    expect(wrapper.find('#andela-logo').prop('src')).toEqual(andelaLogo);
  });

  it('renders page title', () => {
    expect(wrapper.find('.landing-heading').length).toBe(1);
    expect(wrapper.find('.landing-heading').prop('content')).toEqual('ART');
  });

  it('renders page description', () => {
    expect(wrapper.find('.description').length).toBe(1);
    expect(wrapper.find('.description').prop('content')).toEqual('Andela Resource Tracker');
  });

  it('should call the handleLogin function when the sign in button is clicked', () => {
    const handleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleLogin'
    );
    wrapper.find('Button').simulate('click');
    wrapper.instance().handleLogin();
    expect(handleLoginSpy.mock.calls.length).toEqual(1)
  });
});
