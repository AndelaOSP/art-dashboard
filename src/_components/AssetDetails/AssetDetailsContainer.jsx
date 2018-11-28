import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import {
  getAssetDetail,
  getAssetDetailSuccess as addAsset,
  updateAsset,
  resetMessage
} from '../../_actions/asset.actions';
import { loadAssetAssigneeUsers } from '../../_actions/users.actions';
import { loadCentres } from '../../_actions/centres.actions';
import AssetDetailsComponent from '../../components/AssetDetails/AssetDetailsComponent';

export const isSameId = (assetDetail, props) => (assetDetail.uuid === props.match.params.id);

const getAssetInfo = (assetDetail, props) => {
  const hasSameId = isSameId(assetDetail, props);
  if (hasSameId) {
    return assetDetail;
  }
  return get(props.location, 'state', {});
};

export const mapStateToProps = ({ asset, usersList, centres }, ownProps) => {
  const {
    assetDetail,
    errorMessage,
    hasError,
    newAllocation,
    unAssignedAsset,
    buttonLoading,
    success,
    updateLoading
  } = asset;
  const { assetAsigneeUsers } = usersList;
  const assetLoading = asset.isLoading;
  const userLoading = usersList.isLoading;
  const details = getAssetInfo(assetDetail, ownProps);
  const hasSameId = isSameId(assetDetail, ownProps);
  const shouldFetchDetails = isEmpty(details);
  const shouldAddToStore = !hasSameId && !shouldFetchDetails;
  const { centreList } = centres;
  const centreLoading = centres.isLoading;

  return {
    assetAsigneeUsers,
    shouldFetchDetails,
    assetDetail: details,
    shouldAddToStore,
    newAllocation,
    unAssignedAsset,
    errorMessage,
    hasError,
    assetLoading,
    userLoading,
    buttonLoading,
    centreList,
    centreLoading,
    updateLoading,
    success
  };
};

export default connect(mapStateToProps, {
  getAssetDetail,
  loadAssetAssigneeUsers,
  addAsset,
  loadCentres,
  updateAsset,
  resetMessage
})(AssetDetailsComponent);
