import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetsComponent } from '../components/AssetsComponent';

import assets from '../_mock/assets';

describe('Renders <AssetsComponent /> correctly', () => {
  const props = {
    getAssetsAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    hasError: false,
    history: { push: jest.fn() },
    isLoading: false,
    assets,
    assetsCount: 10
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

  it('calls the handleViewAsset function when the view button is clicked', () => {
    const handleViewAssetSpy = jest.spyOn(
      wrapper.instance(), 'handleViewAsset'
    );
    wrapper.instance().handleViewAsset();
    expect(handleViewAssetSpy.mock.calls.length).toEqual(1);
  });
});
