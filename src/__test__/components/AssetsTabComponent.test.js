import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import AssetsTab from '../../components/Assets/AssetsTabComponent';

describe('Renders <AssetsTabComponent /> tests', () => {
  const props = {
    filterAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    filterSelection: jest.fn(),
    handleRowChange: jest.fn(),
    assetsList: {},
    filterData: {},
    selected: {},
    currentAssets: [],
    assets: [],
    activePage: 1,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    limit: 0,
    showPaginator: false,
    totalPages: 0
  };
  const wrapper = mount(<AssetsTab {...props} />);

  it('renders tab with menuitem All Assets and Import Assets', () => {
    expect(wrapper.find('Tab').exists()).toEqual(true);
    expect(wrapper.find('.item').at(0).text()).toEqual('All Assets');
    expect(wrapper.find('.item').at(1).text()).toEqual('Import Assets');
  });

  it('renders AssetsTableContent and FilterButton when active menu item is All Assets', () => {
    expect(wrapper.find('.active.item').text()).toEqual('All Assets');
    expect(wrapper.find('AssetsTableContent').exists()).toEqual(true);
    expect(wrapper.find('FilterButton').exists()).toEqual(true);
  });

  it('renders PaginationComponent when showPaginator prop is true', () => {
    wrapper.setProps({
      showPaginator: true
    });

    expect(wrapper.find('PaginationComponent').exists()).toEqual(true);
  });
});
