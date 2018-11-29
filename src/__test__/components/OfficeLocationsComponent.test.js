import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import OfficeLocationsComponent from '../../components/OfficeLocations/OfficeLocationsComponent';

import officeLocations from '../../_mock/officeLocations';
import localStorageMock from '../../_mock/localStorage';
import { asset } from '../../_mock/asset';

window.localStorage = localStorageMock;

describe('Renders <OfficeLocationsComponent /> correctly', () => {
  const props = {
    locationLoading: false,
    assetDetail: asset,
    location: asset.asset_location,
    locationList: officeLocations.results,
    updateLoading: false,
    showFetchLocations: false,
    updateAsset: async () => {},
    uuid: asset.uuid
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OfficeLocationsComponent {...props} />);
  });

  it('calls the handleChange function', () => {
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {};

    wrapper.instance().handleChange(event, data);
    expect(handleChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the toggleFormVisibility function', () => {
    const toggleFormVisibilitySpy = jest.spyOn(
      wrapper.instance(), 'toggleFormVisibility'
    );

    wrapper.instance().toggleFormVisibility();
    expect(toggleFormVisibilitySpy.mock.calls.length).toEqual(1);
  });

  it('calls the updateLocation function', () => {
    const updateLocationSpy = jest.spyOn(
      wrapper.instance(), 'updateLocation'
    );

    wrapper.instance().updateLocation();
    expect(updateLocationSpy.mock.calls.length).toEqual(1);
  });

  it('renders DropdownComponent', () => {
    wrapper.setState({
      show: true
    });

    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });
});
