import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { withRouter } from 'react-router-dom';
import { shallowWithStore } from 'enzyme-redux';
import { connect } from 'react-redux';

import DashboardComponent from '../components/DashboardComponent';

describe('Renders <DashboardComponent /> correctly', () => {

  const { WrappedComponent } = withRouter(connect()(DashboardComponent));
  const wrapper = shallowWithStore(<WrappedComponent />, createMockStore(null));

  it('renders navbar component', () => {
    expect(wrapper.find('NavbarComponent').length).toBe(1);
  });

  it('renders card component', () => {
    expect(wrapper.find('CardComponent').length).toBe(1);
  });

  it('renders barline graph component', () => {
    expect(wrapper.find('BarlineGraphComponent').length).toBe(1);
  });

  it('renders pie chart component', () => {
    expect(wrapper.find('PieChartComponent').length).toBe(1);
  });

});
