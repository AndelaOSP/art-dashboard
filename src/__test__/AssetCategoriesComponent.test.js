import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetCategoriesComponent } from '../components/AssetCategoriesComponent';

import assetCategories from '../_mock/assetCategories';

describe('Asset Categories Component', () => {
  const props = {
    loadAssetCategories: jest.fn(),
    handlePaginationChange: jest.fn(),
    categories: assetCategories,
    assetCategoriesCount: 2
  };

  const wrapper = shallow(<AssetCategoriesComponent {...props} />);

  it('renders page heading', () => {
    expect(wrapper.find('.landing-heading').prop('content')).toEqual('Asset Categories');
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders a Table Component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });
});
