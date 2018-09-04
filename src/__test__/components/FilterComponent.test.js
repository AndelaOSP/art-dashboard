import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Filter from '../../components/common/FilterComponent';

import assetFilter from '../../_mock/assetsFilter';

describe('Renders <FilterComponent /> correctly', () => {
  const props = {
    handleTitleClick: jest.fn(),
    toggleCheckbox: jest.fn(),
    handleFilter: jest.fn(),
    filterAction: jest.fn(),
    toggleOn: true,
    options: assetFilter,
    filterSets: {
      'Asset Types': new Set(),
      'Model Numbers': new Set()
    },
    activePage: 1,
    limit: 10
  };

  const wrapper = shallow(<Filter {...props} />);

  it('renders Accordion', () => {
    expect(wrapper.find('Accordion'));
  });

  it('renders CheckboxComponent', () => {
    expect(wrapper.find('CheckboxComponent'));
  });

  it('does not render Accordion when toggleOn is false', () => {
    wrapper.setProps({ toggleOn: false });
    expect(wrapper.find('Accordion').length).toBe(0);
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
});
