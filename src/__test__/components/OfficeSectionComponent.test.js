import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import OfficeSections from '../../components/OfficeSections/OfficeSectionsComponent';

import Sections from '../../_mock/officeSections';

describe('OfficeSectionComponent Spec', () => {
  let wrapper;

  const props = {
    loadOfficeSections: jest.fn(),
    isLoading: false,
    list: Sections.results
  };

  beforeEach(() => {
    wrapper = shallow(<OfficeSections {...props} />);
  });


  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Table component when Loading is false', () => {
    wrapper.setProps({ isLoading: false });
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders ItemsNotFoundComponent component if office Sections is empty', () => {
    wrapper.setProps({ isLoading: false, list: [] });
    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });

  it('calls handleRowChange when a user tries to change row limit', () => {
    const handleRowChangeSpy = jest.spyOn(wrapper.instance(), 'handleRowChange');

    const event = { stopPropagation: jest.fn() };
    const data = { value: '' };

    wrapper.setProps({ onChange: handleRowChangeSpy });
    wrapper.find('DropdownComponent').simulate('change', event, data);
    expect(handleRowChangeSpy).toHaveBeenCalledWith(event, data);
    expect(handleRowChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handlePaginationChange when next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(wrapper.instance(), 'handlePaginationChange');

    const event = { stopPropagation: jest.fn() };
    const data = {};

    wrapper.setProps({ onPageChange: handlePaginationChangeSpy });
    wrapper.find('Pagination').simulate('pageChange', event, data);

    expect(handlePaginationChangeSpy).toHaveBeenCalledWith(event, data);
    expect(handlePaginationChangeSpy).toHaveBeenCalledTimes(1);
  });
});
