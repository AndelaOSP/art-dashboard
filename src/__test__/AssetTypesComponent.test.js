import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetTypesComponent } from '../components/AssetTypesComponent';

import assetTypes from '../_mock/assetType';

describe('Renders <AssetTypesComponent /> correctly', () => {
  let props = {
    loadAssetTypes: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    assetTypes,
    assetTypesCount: 6
  };
  let wrapper = shallow(<AssetTypesComponent
    {...props}
  />
  );

  it('renders page title', () => {
    expect(wrapper.find('.landing-heading').prop('content')).toEqual('Asset Types');
  });

  it('renders new-asset-types button', () => {
    expect(wrapper.find('Button').prop('data-tooltip')).toEqual('Add new asset types');
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders TableRowComponent component', () => {
    expect(wrapper.find('TableRowComponent').length).toBe(1);
  });

  it('renders Loader component if isLoading is true', () => {
    props = {
      loadAssetTypes: jest.fn(),
      handlePaginationChange: jest.fn(),
      isLoading: true,
      assetTypes,
      assetTypesCount: 0
    };
    wrapper = shallow(<AssetTypesComponent {...props} />);
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

  it('renders message if no asset types are returned', () => {
    wrapper.setProps({
      isLoading: false,
      assetTypes: []
    });
    expect(wrapper.find('h1').text()).toEqual('No Asset Types Found');
  });

  it('renders the AssetTypesAction component correctly', () => {
    wrapper.setProps({
      isLoading: false,
      assetTypes
    });
    expect(wrapper.find('AssetTypesAction').length > 0).toBeTruthy();
  });
});
