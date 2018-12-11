import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getAssetsAction, setActivePage, resetAssets, loading } from '../../_actions/assets.action';
import { loadAllAssetModels } from '../../_actions/assetModels.action';
import { loadDropdownAssetTypes } from '../../_actions/assetTypes.actions';
import filterSelection from '../../_actions/checkedFilters.actions';
import formatOption from '../../_utils/filters';

import Assets from '../../components/AssetsComponent';

export const createFilterData = (assetTypes, assetModels) => {
  if (isEmpty(assetTypes) && isEmpty(assetModels)) {
    return [];
  }

  const formattedAssetTypes = assetTypes.map(assetType => formatOption(assetType, 'asset_type'));
  const formattedAssetModels = assetModels.map(assetModel => formatOption(assetModel, 'model_number'));

  return [
    {
      title: 'Asset Types',
      content: formattedAssetTypes
    },
    {
      title: 'Model Numbers',
      content: formattedAssetModels
    }
  ];
};

export const mapStateToProps = (state, ownProps) => {
  const { assets, assetTypesList, assetModelsList, selected } = state;
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
  const { assetModels } = assetModelsList;
  const { assetTypes } = assetTypesList;

  const assetAdjective = params.status || '';
  const shouldReload = assetAdjective !== assets.status;
  // const assetsEmpty = isEmpty(assets.assetsList);

  return {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    filterData: createFilterData(assetTypes, assetModels),
    activePage,
    selected,
    status,
    // shouldFetchAssets: shouldReload || assetsEmpty,
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
