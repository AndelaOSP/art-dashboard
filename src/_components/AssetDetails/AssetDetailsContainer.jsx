import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { getAssetDetail, getAssetDetailSuccess as addAsset } from '../../_actions/asset.actions';
import { loadAssetAssigneeUsers } from '../../_actions/users.actions';
import AssetDetailsComponent from '../../components/AssetDetails/AssetDetailsComponent';

export const isSameId = (assetDetail, props) => (assetDetail.uuid === props.match.params.id);

const getAssetInfo = (assetDetail, props) => {
  const hasSameId = isSameId(assetDetail, props);
  if (hasSameId) {
    return assetDetail;
  }
  return get(props.location, 'state', {});
};

export const mapStateToProps = ({ asset, usersList }, ownProps) => {
  const {
    assetDetail,
    errorMessage,
    hasError,
    newAllocation,
    unAssignedAsset,
    buttonLoading
  } = asset;
  const { assetAsigneeUsers } = usersList;
  const assetLoading = asset.isLoading;
  const userLoading = usersList.isLoading;
  const details = getAssetInfo(assetDetail, ownProps);
  const hasSameId = isSameId(assetDetail, ownProps);
  const shouldFetchDetails = isEmpty(details);
  const shouldAddToStore = !hasSameId && !shouldFetchDetails;

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
    buttonLoading
  };
};

export default connect(mapStateToProps, {
  getAssetDetail,
  loadAssetAssigneeUsers,
  addAsset
})(AssetDetailsComponent);
