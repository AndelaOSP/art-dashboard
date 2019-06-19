import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import OfficeBlocksComponent from '../../components/OfficeBlocks/OfficeBlocksComponent';

describe('Renders <OfficeBlocksComponent /> correctly', () => {
  const props = {
    isLoading: false,
    blockCount: 2,
    locationList: [{ name: 'Lagos', id: 23 }, { name: 'Nairobi', id: 45 }],
    loadOfficeBlocks: jest.fn(),
    loadOfficeLocations: jest.fn(),
    loadCentreOfficeBlocks: jest.fn(),
    loadCountries: jest.fn(),
    resetMessage: jest.fn()
  };

  const wrapper = shallow(<OfficeBlocksComponent {...props} />);

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

  it('calls handleToggleModal when the modal is toggled', () => {
    const handleToggleModalSpy = jest.spyOn(wrapper.instance(), 'handleToggleModal');

    wrapper.setState({ modalOpen: true });

    const event = {};
    const data = {};

    wrapper.instance().handleToggleModal(event, data);
    expect(handleToggleModalSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state('modalOpen')).toEqual(false);
  });

  it('calls handleEditToggleModal when modal is clicked', () => {
    const handleEditToggleModalSpy = jest.spyOn(wrapper.instance(), 'handleEditToggleModal');

    wrapper.setState({ modalOpen: true });

    const event = {};
    const data = {};

    wrapper.instance().handleEditToggleModal(event, data);
    expect(handleEditToggleModalSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state('modalOpen')).toEqual(true);
  });


  it('calls handleDropdownChange the dropdown item is selected', () => {
    const handleDropdownChangeSpy = jest.spyOn(wrapper.instance(), 'handleDropdownChange');

    const event = {};
    const data = {};

    wrapper.instance().handleDropdownChange(event, data);
    expect(handleDropdownChangeSpy.mock.calls.length).toEqual(1);
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
