import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import PieChartComponent from '../components/PieChartComponent';
import statistics from '../_mock/statistics'

describe('Renders <NavbarComponent /> correctly', () => {

  const { WrappedComponent } = withRouter(connect()(PieChartComponent));
  const wrapper = shallowWithStore(<WrappedComponent statistics={statistics} />, createMockStore(null));

  it('renders pie chart graph', () => {
    expect(wrapper.find('ReactFC').length).toBe(1);
  });

  it('renders a divider', () => {
    expect(wrapper.find('Divider').length).toBe(1);
  });

});
