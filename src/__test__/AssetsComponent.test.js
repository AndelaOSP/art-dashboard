import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetsComponent } from '../components/AssetsComponent';

import assets from '../_mock/assets';
import assetModels from '../_mock/assetModels';
import assetTypes from '../_mock/assetTypes';

describe('Renders <AssetsComponent /> correctly', () => {
  const props = {
    getAssetsAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    createFilterData: jest.fn(),
    handleRowChange: jest.fn(),
    loadAllAssetModels: jest.fn(),
    loadDropdownAssetTypes: jest.fn(),
    hasError: false,
    history: { push: jest.fn() },
    isLoading: false,
    assets,
    assetsCount: 10,
    assetModels,
    assetTypes,
    render: () => true
  };
  const wrapper = shallow(<AssetsComponent
    {...props}
  />);

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Assets List');
  });

  it('renders the AssetsTableContent component', () => {
    expect(wrapper.find('AssetsTableContent').length).toBe(1);
  });

  it('should not rerender the component if the error message is the same', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    wrapper.setProps({ hasError: true });
    expect(shouldComponentUpdateSpy.mock.calls.length).toBe(1);
  });

  it('calls the emptyAssetsCheck function to check if the assetsList is empty', () => {
    const emptyAssetsCheckSpy = jest.spyOn(
      wrapper.instance(), 'emptyAssetsCheck'
    );
    wrapper.instance().emptyAssetsCheck();
    expect(emptyAssetsCheckSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handlePaginationChange function when the next button is clicked', () => {
    global.localStorage = {};
    global.localStorage.setItem = jest.fn();
    global.localStorage.getItem = jest.fn();
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

  it('calls the createFilterData function to loop through the asset types and model numbers', () => {
    const createFilterDataSpy = jest.spyOn(
      wrapper.instance(), 'createFilterData'
    );
    wrapper.instance().createFilterData();
    expect(createFilterDataSpy.mock.calls.length).toEqual(1);
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
    expect(wrapper.find('FilterButton').length).toBe(1);
  });

  it('renders FilterComponent', () => {
    expect(wrapper.find('FilterButton').dive().find('FilterComponent').length).toBe(1);
  });

  it('calls the getCurrentPage function when the pagination page changes', () => {
    const getCurrentPageSpy = jest.spyOn(
      wrapper.instance(), 'getCurrentPage'
    );
    wrapper.instance().getCurrentPage();
    expect(getCurrentPageSpy.mock.calls.length).toEqual(1);
  });
});
