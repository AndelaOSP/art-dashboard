import { connect } from 'react-redux';

import { getAssetDetail } from '../../_actions/asset.actions';
import { loadAssetAssigneeUsers } from '../../_actions/users.actions';
import AssetDetailsComponent from '../../components/AssetDetails/AssetDetailsComponent';

export const isSameId = (assetDetail, props) => (assetDetail.uuid === props.match.params.id);

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

  return {
    assetAsigneeUsers,
    assetDetail,
    shouldFetchDetails: !isSameId(assetDetail, ownProps),
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
  getAssetDetail, loadAssetAssigneeUsers
})(AssetDetailsComponent);
