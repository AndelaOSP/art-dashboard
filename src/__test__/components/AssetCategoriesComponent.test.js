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

  it('renders PaginationComponent', () => {
    expect(wrapper.find('PaginationComponent').length).toBe(1);
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

  it('calls handleToggleModal when a modal is opened or closed', () => {
    wrapper.setState({ modalOpen: false });

    wrapper.instance().handleToggleModal();
    expect(wrapper.state().modalOpen).toEqual(true);
  });

  it('calls the handlePaginationChange function', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};

    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleRowChange function ', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};

    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
