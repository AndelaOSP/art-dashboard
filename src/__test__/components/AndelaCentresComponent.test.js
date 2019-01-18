import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AndelaCentresComponent from '../../components/AndelaCentres/AndelaCentresComponent';

import centres from '../../_mock/officeLocations';
import countries from '../../_mock/countries';

describe('Renders <AndelaCentresComponent /> correclty', () => {
  const props = {
    isLoading: false,
    centresCount: 2,
    loadAndelaCentres: jest.fn(),
    loadCountries: jest.fn(),
    centres,
    countries
  };

  const wrapper = shallow(<AndelaCentresComponent {...props} />);

  it('calls handleRowChange when a user tries to change row limit', () => {
    const handleRowChangeSpy = jest.spyOn(wrapper.instance(), 'handleRowChange');

    const event = {};
    const data = {};

    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls handlePaginationChange when next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(wrapper.instance(), 'handlePaginationChange');

    const event = {};
    const data = {};

    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the getTotalPages function when the next button is clicked', () => {
    const getTotalPagesSpy = jest.spyOn(wrapper.instance(), 'getTotalPages');
    wrapper.instance().getTotalPages();
    expect(getTotalPagesSpy.mock.calls.length).toEqual(1);
  });

  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });
});
