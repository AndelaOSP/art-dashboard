import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetFilterComponent from '../components/Assets/AssetFilterComponent';

import assetFilter from '../_mock/assetsFilter';

describe('Renders <AssetFilterComponent /> correctly', () => {
  const props = {
    handleTitleClick: jest.fn(),
    toggleCheckbox: jest.fn(),
    updateFilterSet: jest.fn(),
    handleFilter: jest.fn(),
    getAssetsAction: jest.fn(),
    assetFilter
  };

  const wrapper = shallow(<AssetFilterComponent {...props} />);

  it('calls handleTitleClick when the title is clicked', () => {
    const handleTitleClickSpy = jest.spyOn(
      wrapper.instance(), 'handleTitleClick'
    );
    const event = {};
    const data = {};
    wrapper.instance().handleTitleClick(event, data);
    expect(handleTitleClickSpy.mock.calls.length).toEqual(1);
  });

  it('calls toggleCheckbox when an option is clicked', () => {
    const toggleCheckboxSpy = jest.spyOn(
      wrapper.instance(), 'toggleCheckbox'
    );
    const label = {};
    const name = {};
    wrapper.instance().toggleCheckbox(label, name);
    expect(toggleCheckboxSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleFilter to apply the filtered options', () => {
    const handleFilterSpy = jest.spyOn(
      wrapper.instance(), 'handleFilter'
    );
    wrapper.instance().handleFilter();
    expect(handleFilterSpy.mock.calls.length).toEqual(1);
  });
});
