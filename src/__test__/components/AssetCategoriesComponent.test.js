import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetCategoriesComponent } from '../../components/Category/AssetCategoriesComponent';

import assetCategories from '../../_mock/assetCategories';

describe('Asset Categories Component', () => {
  const props = {
    loadAssetCategories: jest.fn(),
    handlePaginationChange: jest.fn(),
    categories: assetCategories,
    assetCategoriesCount: 2,
    isLoading: false,
    hasError: false
  };

  const wrapper = shallow(<AssetCategoriesComponent {...props} />);

  it('renders page heading', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Asset Categories');
  });

  it('renders a divider below the heading', () => {
    expect(wrapper.find('#assets-divider').length).toBe(1);
  });

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders a Table Component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders a Dropdown Component', () => {
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });

  it('renders error message if there are no asset categories', () => {
    wrapper.setProps({
      isLoading: false,
      categories: []
    });
    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });

  it('renders a Loading Component if isLoading is true', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders error message if hasError is true', () => {
    wrapper.setProps({
      hasError: true,
      isLoading: false
    });
    expect(wrapper.find('h1').text()).toEqual('An Error Occurred While Trying To Display The Asset Categories');
  });
});
