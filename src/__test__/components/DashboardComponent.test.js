import React from 'react';
import expect from 'expect';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import DashboardComponent from '../../components/Dashboard/DashboardComponent';

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
    expect(wrapper.find('Grid').length).toBe(2);
  });

  it('renders checkmark if assetStateDamaged is true', () => {
    wrapper.setState({
      assetStateDamaged: false
    });
    wrapper.setState({
      assetStateDamaged: true
    });

    expect(wrapper.find('.checkmark').exists()).toBe(true);
  });

  it('renders checkmark if assetStateLost is true', () => {
    wrapper.setState({
      assetStateLost: true
    });

    expect(wrapper.find('.checkmark').exists()).toBe(true);
  });

  it('renders checkmark if assetStateAllocated is true', () => {
    wrapper.setState({
      assetStateAllocated: true
    });

    expect(wrapper.find('.checkmark').exists()).toBe(true);
  });

  it('renders checkmark if assetStateAvailable is true', () => {
    wrapper.setState({
      assetStateAvailable: true
    });

    expect(wrapper.find('.checkmark').exists()).toBe(true);
  });
});
