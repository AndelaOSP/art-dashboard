import React from 'react';
import { shallow } from 'enzyme';
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
    assetsList: {},
    loading: jest.fn(),
    match: {
      params: { status: '' }
    },
    handlePageTotal: jest.fn()
  };
  const wrapper = shallow(<AssetsComponent
    {...props}
  />);

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Assets');
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
});
