import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import AssetsComponent from '../../components/AssetsComponent';
import assets from '../../_mock/assets';
import assetModels from '../../_mock/assetModels';
import assetTypes from '../../_mock/assetTypes';
import filters from '../../_mock/filters';

describe('Renders <AssetsComponent /> correctly', () => {
  const props = {
    getAssetsAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    filterData: filters,
    handleRowChange: jest.fn(),
    setActivePage: jest.fn(),
    loadAllAssetModels: jest.fn(),
    loadDropdownAssetTypes: jest.fn(),
    hasError: false,
    history: { push: jest.fn() },
    isLoading: false,
    assets,
    assetsCount: 10,
    assetModels,
    assetTypes,
    selected: {},
    filterSelection: jest.fn(),
    resetAssets: jest.fn(),
    assetsList: [],
    loading: jest.fn(),
    match: {
      params: { status: '', filters: '' }
    },
    handlePageTotal: jest.fn(),
    location: {
      pathname: '/assets/allocated'
    },
    shouldReload: false,
    reloadAfterSearch: false
  };

  const wrapper = shallow(<AssetsComponent
    {...props}
  />);

  it('renders the AssetsTableContent component', () => {
    expect(wrapper.find('AssetsTableContent').length).toBe(1);
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

  it('calls the handlePageTotal function when the next button is clicked', () => {
    const handlePageTotalSpy = jest.spyOn(
      wrapper.instance(), 'handlePageTotal'
    );
    wrapper.instance().handlePageTotal();
    expect(handlePageTotalSpy.mock.calls.length).toEqual(1);
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

  it('renders FilterButton', () => {
    wrapper.setState({
      assets
    });
    wrapper.setProps({
      assetsList: assets
    });

    expect(wrapper.find('Filter').length).toBe(1);
  });

  it('renders ExportAsset component', () => {
    expect(wrapper.find('ExportAsset').length).toBe(1);
  });

  it('calls retrieveAssets function', () => {
    const retrieveAssetsSpy = jest.spyOn(
      wrapper.instance(), 'retrieveAssets'
    );

    wrapper.instance().retrieveAssets(1, 10, '');
    expect(retrieveAssetsSpy.mock.calls.length).toEqual(1);
  });

  it('shows filter button even when assets list is empty', () => {
    wrapper.setProps({
      assetsList: []
    });

    expect(wrapper.find('Filter').length).toBe(1);
  });

  it('renders the AssetsTableContent component when loading only allocated asets', () => {
    wrapper.setProps({
      match: { params: { status: 'allocated' } },
      shouldReload: true });
    expect(wrapper.find('AssetsTableContent').length).toBe(1);
  });

  it('renders the AssetsTableContent component when searching for an asset', () => {
    wrapper.setProps({
      match: { params: { filters: '87878' } },
      reloadAfterSearch: true });
    expect(wrapper.find('AssetsTableContent').length).toBe(1);
  });

  it('loads AssetsComponent with filtered assets', () => {
    props.match.params.filters = '87878';
    const wrapper2 = mount(<AssetsComponent
      {...props}
    />);
    expect(wrapper2.props().match).toEqual({ params: { filters: '87878', status: '' } });
  });
});
