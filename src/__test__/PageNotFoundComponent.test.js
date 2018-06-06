import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PageNotFoundComponent from '../components/PageNotFoundComponent.jsx';

describe('PageNotFoundComponent is rendered when there is a 404 error', () => {
  const wrapper = shallow(<PageNotFoundComponent />);

  it('renders a div element', () => {
    expect(wrapper.find('.page-404').length).toBe(1);
  });

  it('renders two images on the page', () => {
    expect(wrapper.find('Image').length).toBe(2);
  });

  it('renders two Buttons, one leading to previous page, the other home page', () => {
    expect(wrapper.find('Button').length).toBe(2);
  });
});
