import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import FilterComponent from '../../components/common/FilterComponent';

import assetFilter from '../../_mock/assetsFilter';
import filters from '../../_mock/filters';

describe('Renders <FilterComponent /> correctly', () => {
  const props = {
    handleTitleClick: jest.fn(),
    toggleCheckbox: jest.fn(),
    handleFilter: jest.fn(),
    filterAction: jest.fn(),
    keepCheckboxChecked: jest.fn(),
    addCheckedFilter: jest.fn(),
    handleCheckedFilters: jest.fn(),
    handleClose: jest.fn(),
    options: assetFilter,
    filterSets: {
      'Asset Types': new Set(),
      'Model Numbers': new Set()
    },
    checkedFilters: filters,
    activePage: 1,
    limit: 10
  };

  const wrapper = shallow(<FilterComponent {...props} />);

  it('renders Accordion', () => {
    expect(wrapper.find('Accordion'));
  });

  it('renders CheckboxComponent', () => {
    expect(wrapper.find('CheckboxComponent'));
  });

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

  it('calls keepCheckboxChecked to keep filter options checked after applying', () => {
    const keepCheckboxCheckedSpy = jest.spyOn(
      wrapper.instance(), 'keepCheckboxChecked'
    );
    const label = {};
    const name = {};
    wrapper.instance().keepCheckboxChecked(label, name);
    expect(keepCheckboxCheckedSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleCheckedFilters to return checked filters', () => {
    const handleCheckedFiltersSpy = jest.spyOn(
      wrapper.instance(), 'handleCheckedFilters'
    );
    wrapper.instance().handleCheckedFilters();
    expect(handleCheckedFiltersSpy.mock.calls.length).toEqual(1);
  });
});
