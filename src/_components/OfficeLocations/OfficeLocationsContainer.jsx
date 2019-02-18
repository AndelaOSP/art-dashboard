import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { loadOfficeLocations } from '../../_actions/officeLocations.actions';
import { updateAsset } from '../../_actions/asset.actions';

import OfficeLocations from '../../components/OfficeLocations/OfficeLocationsComponent';

export const getLocationList = locations => locations.map(location => location.name);

export const mapStateToProps = ({ asset, assets, officeLocations }) => ({
  locationLoading: officeLocations.isLoading,
  assetDetail: asset.assetDetail,
  location: (asset.assetDetail || {}).asset_location || '',
  locationList: getLocationList(officeLocations.locationList),
  updateLoading: assets.updateLoading,
  shouldFetchLocations: isEmpty(officeLocations.locationList)
});

export default connect(mapStateToProps, {
  loadOfficeLocations,
  updateAsset
})(OfficeLocations);
