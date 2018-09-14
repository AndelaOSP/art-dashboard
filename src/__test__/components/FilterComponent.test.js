import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import FilterComponent from '../../components/common/FilterComponent';

import assetFilter from '../../_mock/assetsFilter';
import filters from '../../_mock/filters';

describe('Renders <FilterComponent /> correctly', () => {
  const props = {
    handleTitleClick: jest.fn(),
    handleCheckboxChange: jest.fn(),
    handleFilter: jest.fn(),
    filterAction: jest.fn(),
    handleClose: jest.fn(),
    option: assetFilter,
    activePage: 1,
    limit: 10,
    selected: filters
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

  it('calls handleCheckboxChange when an option is clicked', () => {
    const handleCheckboxChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleCheckboxChange'
    );

    const event = {};
    wrapper.instance().handleCheckboxChange(event);
    expect(handleCheckboxChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls handleFilter to apply the filtered options', () => {
    const handleFilterSpy = jest.spyOn(
      wrapper.instance(), 'handleFilter'
    );
    wrapper.instance().handleFilter();
    expect(handleFilterSpy.mock.calls.length).toEqual(1);
  });
});
