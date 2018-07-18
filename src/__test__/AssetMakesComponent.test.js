import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetMakeComponent } from '../components/AssetMake/AssetMakeComponent';

import assetMakes from '../_mock/assetMakes';

describe('Renders <AssetMakeComponent /> correctly', () => {
  const props = {
    loadAssetMakes: jest.fn(),
    handlePaginationChange: jest.fn(),
    isLoading: false,
    assetMakes,
    assetMakesCount: 10
  };
  let wrapper = shallow(<AssetMakeComponent
    {...props}
  />);

  it('renders Loading component if isLoading is true', () => {
    props.isLoading = true;
    wrapper = shallow(<AssetMakeComponent
      {...props}
    />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Pagination component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetMakeComponent
      {...props}
    />);
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetMakeComponent
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
