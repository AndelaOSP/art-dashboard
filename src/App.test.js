import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import localStorageMock from './_mock/localStorage';

window.localStorage = localStorageMock;

describe('App test cases', () => {
  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    expect(wrapper.find('.App').length).toBe(1);
  });
});
