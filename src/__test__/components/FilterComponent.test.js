import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import FilterComponent from '../../components/common/Filter/FilterComponent';

import assetFilter from '../../_mock/assetsFilter';
import { selectedFilters } from '../../_mock/filters';

describe('Renders <FilterComponent /> correctly', () => {
  const props = {
    handleTitleClick: jest.fn(),
    handleCheckboxChange: jest.fn(),
    loadAccordionValue: jest.fn(),
    handleClose: jest.fn(),
    option: assetFilter[0],
    selected: selectedFilters,
    filterSelection: jest.fn(),
    index: 0,
    activeIndex: 0
  };

  const wrapper = shallow(<FilterComponent {...props} />);

  it('renders Accordion', () => {
    expect(wrapper.find('Accordion'));
  });

  it('renders CheckboxComponent', () => {
    expect(wrapper.find('CheckboxComponent'));
  });

  it('returns a message when option is empty', () => {
    wrapper.setProps({ option: {} });
    expect(wrapper.find('p'));
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

    const event = {
      target: {
        checked: true,
        value: ''
      }
    };
    wrapper.instance().handleCheckboxChange({}, event);
    expect(handleCheckboxChangeSpy.mock.calls.length).toEqual(1);
  });
});
