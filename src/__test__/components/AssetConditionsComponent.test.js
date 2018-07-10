import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetConditionsComponent } from '../../components/AssetCondition/AssetConditionsComponent';
import assetConditions from '../../_mock/assetConditions';

describe('Renders <AssetConditionsComponent/> component', () => {
  const props = {
    loadAssetConditions: jest.fn(),
    handlePaginationChange: jest.fn(),
    assetConditionsList: assetConditions,
    assetConditionsCount: 3,
    isLoading: false
  };

  const wrapper = shallow(<AssetConditionsComponent {...props} />);

  it('renders error if no asset conditions are found', () => {
    wrapper.setProps({
      isLoading: false,
      assetConditionsList: []
    });
    expect(wrapper.find('h1').text()).toEqual('No Asset Conditions Found');
  });

  it('renders table when asset conditions are loaded successfully', () => {
    wrapper.setProps({
      isLoading: false,
      assetConditionsList: assetConditions,
      assetConditionsCount: 3
    });
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders Pagination component', () => {
    wrapper.setProps({
      isLoading: false,
      assetConditionsList: assetConditions,
      assetConditionsCount: 3
    });
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('calls the handlePaginationChange function when a new page is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('renders the AssetConditionActionComponent component correctly', () => {
    wrapper.setProps({
      isLoading: false,
      assetConditionsList: assetConditions
    });
    expect(wrapper.find('AssetConditionActionComponent').length > 0).toBeTruthy();
  });
});
