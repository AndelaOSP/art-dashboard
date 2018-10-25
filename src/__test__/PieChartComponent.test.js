import React from 'react';
import expect from 'expect';
import { connect } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';

import PieChartComponent from '../components/PieChartComponent';
import statistics from '../_mock/statistics';

describe('Renders <NavBarComponent /> correctly', () => {
  const { WrappedComponent } = withRouter(connect()(PieChartComponent));
  const wrapper = shallowWithStore(
    <WrappedComponent statistics={statistics} />,
    createMockStore(null));

  it('renders pie chart graph', () => {
    expect(wrapper.find('ReactFC').length).toBe(1);
  });

  it('renders a divider', () => {
    expect(wrapper.find('Divider').length).toBe(1);
  });
});
