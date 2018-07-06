import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetModelsComponent } from '../../components/AssetModels/AssetModelsComponent';

import assetModels from '../../_mock/assetModels';

describe('Renders <AssetModelsComponent /> correctly', () => {
  let props = {
    loadAssetModels: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    assetModels,
    assetModelsCount: 3
  };

  let wrapper = shallow(<AssetModelsComponent{...props} />);

  it('renders page title', () => {
    expect(wrapper.find('.landing-heading').prop('content')).toEqual('Asset Models');
  });

  it('renders new-asset-types button', () => {
    expect(wrapper.find('Button').prop('data-tooltip')).toEqual('Add new asset model');
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders TableRowComponent component', () => {
    expect(wrapper.find('TableRowComponent').length).toBe(3);
  });

  it('renders Action component', () => {
    expect(wrapper.find('ActionComponent').length).toBe(3);
  });

  it('renders Loader component if isLoading is true', () => {
    props = {
      loadAssetModels: jest.fn(),
      handlePaginationChange: jest.fn(),
      isLoading: true,
      assetModels,
      assetModelsCount: 0
    };
    wrapper = shallow(<AssetModelsComponent {...props} />);
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

  it('renders message if no asset models are returned', () => {
    wrapper.setProps({
      isLoading: false,
      assetModels: []
    });
    expect(wrapper.find('h1').text()).toEqual('No Asset Models Found');
  });
});
