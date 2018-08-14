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
    hasError: false,
    assetModels,
    assetModelsCount: 3
  };

  let wrapper = shallow(<AssetModelsComponent{...props} />);

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Asset Models');
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

  it('renders message if an error occus', () => {
    wrapper.setProps({
      isLoading: false,
      hasError: true,
      assetModels: []
    });
    expect(wrapper.find('h1').text())
      .toEqual('An Error Occurred While Trying To Display The Incidence Reports.');
  });
});
