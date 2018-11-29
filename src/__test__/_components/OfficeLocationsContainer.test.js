import expect from 'expect';

import {
  getLocationList,
  mapStateToProps
} from '../../_components/OfficeLocations/OfficeLocationsContainer';

import officeLocations from '../../_mock/officeLocations';
import { asset } from '../../_mock/asset';

describe('Renders <OfficeLocationsContainer /> correctly', () => {
  const props = {
    locationLoading: false,
    assetDetail: asset,
    location: asset.asset_location,
    locationList: officeLocations.results,
    updateLoading: false,
    showFetchLocations: false
  };

  it('calls getLocationList function correctly', () => {
    expect(getLocationList(props.locationList)).toBeInstanceOf(Array);
  });

  it('correctly maps state to props', () => {
    const state = {
      asset: {
        assetDetail: {}
      },
      assets: {
        updateLoading: false,
        success: ''
      },
      officeLocations: {
        locationCount: 0,
        locationList: [],
        isLoading: false,
        error: ''
      }
    };
    const expected = {
      locationLoading: false,
      assetDetail: {},
      location: '',
      locationList: [],
      updateLoading: false,
      showFetchLocations: true
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
