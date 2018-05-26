import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import NavbarComponent from '../components/NavbarComponent';

describe('Renders <NavbarComponent /> correctly', () => {

  const { WrappedComponent } = withRouter(connect()(NavbarComponent));
  const wrapper = shallowWithStore(<WrappedComponent />, createMockStore(null));

  it('renders navbar menu', () => {
    expect(wrapper.find('Menu').length).toBe(1);
  });

});
