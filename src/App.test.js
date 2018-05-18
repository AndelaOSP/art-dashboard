import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import expect from 'expect';

import App from './App';

describe('Renders <App /> correctly', () => {  
  const wrapper = shallow(<App />);
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

});
