import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { getAssetsAction, setActivePage, resetAssets, loading } from '../../_actions/assets.action';
import { loadAllAssetModels } from '../../_actions/assetModels.action';
import { loadDropdownAssetTypes } from '../../_actions/assetTypes.actions';
import filterSelection from '../../_actions/checkedFilters.actions';
import Assets from '../../components/AssetsComponent';

export const mapStateToProps = (state, ownProps) => {
  const { assets, selected } = state;
  const { params } = ownProps.match;

  const {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    activePage,
    status
  } = assets;


  const assetAdjective = params.status || '';
  const shouldReload = assetAdjective !== assets.status;

  return {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    activePage,
    selected,
    status,
    shouldReload
  };
};

export default connect(mapStateToProps, {
  getAssetsAction,
  loadAllAssetModels,
  loadDropdownAssetTypes,
  setActivePage,
  filterSelection,
  resetAssets,
  loading
})(Assets);
