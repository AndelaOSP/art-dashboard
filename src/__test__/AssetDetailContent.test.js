import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetDetailContent from '../components/AssetDetailContent';
import asset from '../_mock/asset';

describe('Renders <AssetDetailContent /> correctly', () => {
  const props = {
    assetDetail: asset,
    assignedUser: asset.assigned_to,
    errorMessage: '',
    hasError: false,
    isLoading: false
  };
  const wrapper = shallow(<AssetDetailContent {...props} />);

  it('renders the asset detail', () => {
    expect(wrapper.find('.asset-details').length).toBe(1);
  });

  it('renders the asset details tab', () => {
    expect(wrapper.find('Tab').length).toBe(1);
  });

  it('renders LoaderComponent if page is loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders a toast message if there is an error', () => {
    wrapper.setProps({ hasError: true, isLoading: false });
    expect(wrapper.find('SemanticToastContainer').length).toBe(1);
  });
});
