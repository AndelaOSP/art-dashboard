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
    isLoading: false,
    hasError: false
  };

  const wrapper = shallow(<AssetConditionsComponent {...props} />);

  it('renders message if an error occurs', () => {
    wrapper.setProps({
      isLoading: false,
      hasError: true,
      assetConditionsList: []
    });
    expect(wrapper.find('h1').text()).toEqual('An Error Occurred While Trying To Display The Asset Conditions.');
  });

  it('renders table when asset conditions are loaded successfully', () => {
    wrapper.setProps({
      isLoading: false,
      hasError: false,
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
});
