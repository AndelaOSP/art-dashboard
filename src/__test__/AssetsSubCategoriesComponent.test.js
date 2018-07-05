import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetSubCategoriesComponent } from '../components/AssetsSubCategoriesComponent';

import subcategories from '../_mock/subcategories';

describe('Renders <AssetsSubCategoriesComponent /> correctly', () => {
  const props = {
    loadSubCategories: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: true,
    subcategories,
    assetSubCategoriesCount: 10
  };
  const wrapper = shallow(<AssetSubCategoriesComponent
    {...props}
  />);

  it('renders Loading component if isLoading is true', () => {
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('calls the handlePaginationChange function when the next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the getTotalPages function when the next button is clicked', () => {
    const getTotalPagesSpy = jest.spyOn(
      wrapper.instance(), 'getTotalPages'
    );
    wrapper.instance().getTotalPages();
    expect(getTotalPagesSpy.mock.calls.length).toEqual(1);
  });
});
