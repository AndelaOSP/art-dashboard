import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import DashboardComponent from '../../components/Dashboard/DashboardComponent';

describe('Renders <DashboardComponent /> correctly', () => {
  const props = {
    getAssetStatus: jest.fn(),
    lostAssets: {},
    availableAssets: {},
    damagedAssets: {},
    allocatedAssets: {}
  };

  const wrapper = shallow(<DashboardComponent {...props} />);

  it('renders dashboard contents', () => {
    expect(wrapper.find('#dashboard-content').length).toBe(1);
  });

  it('renders AssetStatusComponent', () => {
    expect(wrapper.find('AssetStatusComponent').length).toBe(4);
  });

  it('renders grid components', () => {
    expect(wrapper.find('Grid').length).toBe(2);
  });
});
