import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import CardComponent from '../components/CardComponent';
import statistics from '../_mock/statistics'

describe('Renders <CardComponent /> correctly', () => {

  const { WrappedComponent } = withRouter(connect()(CardComponent));
  const wrapper = shallowWithStore(<WrappedComponent statistics={statistics} />, createMockStore(null));

  it('renders cards', () => {
    expect(wrapper.find('Card').length).toBe(4);
  });

});
