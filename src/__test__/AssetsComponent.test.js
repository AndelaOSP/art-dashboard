import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetsComponent } from '../components/AssetsComponent';

import assets from '../_mock/assets';

describe('Renders <AssetsComponent /> correctly', () => {
  const props = {
    getAssetsAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    assets: [],
    assetsCount: 10,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    title: 'My Assets'
  };
  const wrapper = shallow(<AssetsComponent
    {...props}
  />);
  const prevProps = wrapper.props();

  wrapper.setProps({ assets });
  wrapper.instance().componentDidUpdate(prevProps);

  it('renders page title', () => {
    expect(wrapper.find('.assets-heading').prop('content')).toEqual('My Assets');
  });

  it('renders the AssetsTableContent component', () => {
    expect(wrapper.find('AssetsTableContent').length).toBe(1);
  });

  it('should not rerender the component if the error message is the same', () => {
    const componentDidUpdateSpy = jest.spyOn(
      wrapper.instance(), 'componentDidUpdate'
    );
    wrapper.setProps({ hasError: true });
    expect(componentDidUpdateSpy.mock.calls.length).toBe(1);
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

  it('calls the emptyAssetCheck function when the next button is clicked', () => {
    const emptyAssetsCheckSpy = jest.spyOn(
      wrapper.instance(), 'emptyAssetsCheck'
    );
    wrapper.instance().emptyAssetsCheck();
    expect(emptyAssetsCheckSpy.mock.calls.length).toEqual(1);
  });
});
