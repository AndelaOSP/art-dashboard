import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetSubCategoriesComponent } from '../../components/SubCategory/AssetsSubCategoriesComponent';

import assetSubCategories from '../../_mock/subcategories';

describe('Renders <AssetsSubCategoriesComponent /> correctly', () => {
  const props = {
    loadSubCategories: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    assetSubCategories,
    assetSubCategoriesCount: 10,
    handleRowChange: jest.fn()
  };
  let wrapper = shallow(<AssetSubCategoriesComponent
    {...props}
  />);

  it('renders Loading component if isLoading is true', () => {
    props.isLoading = true;
    wrapper = shallow(<AssetSubCategoriesComponent
      {...props}
    />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Pagination component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetSubCategoriesComponent
      {...props}
    />);
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetSubCategoriesComponent
      {...props}
    />);
    expect(wrapper.find('Table').length).toBe(1);
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

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Asset Sub-Categories');
  });

  it('calls the getTotalPages function when the next button is clicked', () => {
    const getTotalPagesSpy = jest.spyOn(
      wrapper.instance(), 'getTotalPages'
    );
    wrapper.instance().getTotalPages();
    expect(getTotalPagesSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleToggleModal when a modal is opened or closed', () => {
    wrapper.setState({ modalOpen: false });

    wrapper.instance().handleToggleModal();
    expect(wrapper.state().modalOpen).toEqual(true);
  });

  it('calls handleRowChange when a  number of rows are selected', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
