import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetSpecsComponent } from '../components/AssetSpecs/AssetSpecsComponent';

import specs from '../_mock/assetSpecs';

describe('Renders < AssetSpecsComponent /> correctly', () => {
  const props = {
    loadAssetSpecs: jest.fn(),
    handleRowChange: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    specs,
    assetSpecsCount: 10
  };
  const wrapper = shallow(<AssetSpecsComponent{...props} />);

  afterEach(() => {
    wrapper.setProps(props);
  });

  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({ isLoading: true });

    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Pagination component', () => {
    wrapper.setProps({ isLoading: false });

    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    wrapper.setProps({ isLoading: false });

    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders ItemsNotFoundComponent when specs are empty', () => {
    wrapper.setProps({
      isLoading: false,
      specs: []
    });

    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });

  it('renders error when hasError is true', () => {
    wrapper.setProps({
      isLoading: false,
      hasError: true
    });

    expect(wrapper.find('h1').length).toBe(1);
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

  it('calls the handleRowChange function when the next button is clicked', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
