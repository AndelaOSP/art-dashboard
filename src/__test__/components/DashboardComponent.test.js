import React from 'react';
import expect from 'expect';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import DashboardComponent from '../../components/DashboardComponent';

describe('Renders <DashboardComponent /> correctly', () => {
  const { WrappedComponent } = withRouter(connect()(DashboardComponent));
  const wrapper = shallowWithStore(<WrappedComponent />, createMockStore(null));

  it('renders dashboard contents', () => {
    expect(wrapper.find('#dashboard-content').length).toBe(1);
  });

  it('renders analytics card', () => {
    expect(wrapper.find('.analytics-state-rectangle').length).toBe(4);
  });

  it('renders grid components', () => {
    expect(wrapper.find('Grid').length).toBe(3);
  });
});
