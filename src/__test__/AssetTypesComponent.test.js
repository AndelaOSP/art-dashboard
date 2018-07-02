import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetTypesComponent } from '../components/AssetTypesComponent';

import { assetTypes } from '../_mock/assetType';

describe('Renders <AssetTypesComponent /> correctly', () => {
  let props = {
    loadAssetTypes: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    assetTypes
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
    expect(wrapper.find('TableRowComponent').length).toBe(4);
  });

  it('renders Action component', () => {
    expect(wrapper.find('ActionComponent').length).toBe(4);
  });

  it('renders Loader component if isLoading is true', () => {
    props = {
      loadAssetTypes: jest.fn(),
      handlePaginationChange: jest.fn(),
      isLoading: true,
      assetTypes
    };
    wrapper = shallow(<AssetTypesComponent {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });
});
