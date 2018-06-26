import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetTypesComponent } from '../components/AssetTypesComponent';

import { assetTypes } from '../_mock/assetType';

describe('Renders <AssetTypesComponent /> correctly', () => {
  const props = {
    loadAssetTypeAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    assetTypes,
    assetTypesCount: 20,
  };
  const wrapper = shallow(<AssetTypesComponent
    {...props}
  />
  );

  it('renders page title', () => {
    expect(wrapper.find('.landing-heading').prop('content')).toEqual('Asset Types');
  });

  it('renders new-asset-types button', () => {
    expect(wrapper.find('.ui.button').prop('data-tooltip')).toEqual('Add new asset types');
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders the Action field', () => {
    expect(wrapper.find('TableCell').containsMatchingElement('span'));
  });
});
