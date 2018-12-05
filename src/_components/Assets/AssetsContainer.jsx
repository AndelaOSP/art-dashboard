import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getAssetsAction, setActivePage, resetAssets, loading } from '../../_actions/assets.action';
import { loadAllAssetModels } from '../../_actions/assetModels.action';
import { loadDropdownAssetTypes } from '../../_actions/assetTypes.actions';
import filterSelection from '../../_actions/checkedFilters.actions';

import Assets from '../../components/AssetsComponent';

const formatOption = (data, optionKey) => ({
  id: data.id,
  option: data[optionKey]
});

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

export const mapStateToProps = ({ assets, assetTypesList, assetModelsList, selected }) => {
  const {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    activePage,
    assetStatus
  } = assets;
  const { assetModels } = assetModelsList;
  const { assetTypes } = assetTypesList;

  return {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    filterData: createFilterData(assetTypes, assetModels),
    activePage,
    selected,
    assetStatus
  };
};

export const AssetStatus = connect(mapStateToProps, {
  getAssetsAction,
  loadAllAssetModels,
  loadDropdownAssetTypes,
  setActivePage,
  filterSelection,
  resetAssets,
  loading
})(Assets);

export default connect(mapStateToProps, {
  getAssetsAction,
  loadAllAssetModels,
  loadDropdownAssetTypes,
  setActivePage,
  filterSelection,
  resetAssets,
  loading
})(Assets);
