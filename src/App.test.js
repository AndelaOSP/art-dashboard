import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import localStorageMock from './_mock/localStorage';

window.localStorage = localStorageMock;

it('renders without crashing', () => {
  expect(() => shallow(<App />)).not.toThrow();
});
