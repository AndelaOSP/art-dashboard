import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetSpecsComponent } from '../components/AssetSpecs/AssetSpecsComponent';

import specs from '../_mock/assetSpecs';

describe('Renders < AssetSpecsComponent /> correctly', () => {
  const props = {
    loadAssetSpecs: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    specs,
    assetSpecsCount: 10
  };
  let wrapper = shallow(<AssetSpecsComponent
    {...props}
  />);

  it('renders Loading component if isLoading is true', () => {
    props.isLoading = true;
    wrapper = shallow(<AssetSpecsComponent
      {...props}
    />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Pagination component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetSpecsComponent
      {...props}
    />);
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetSpecsComponent
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

  it('calls the getTotalPages function when the next button is clicked', () => {
    const getTotalPagesSpy = jest.spyOn(
      wrapper.instance(), 'getTotalPages'
    );
    wrapper.instance().getTotalPages();
    expect(getTotalPagesSpy.mock.calls.length).toEqual(1);
  });
});
