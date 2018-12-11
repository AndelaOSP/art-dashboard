import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getAssetsAction } from '../../_actions/assets.action';
import filterSelection from '../../_actions/checkedFilters.actions';
import formatOption from '../../_utils/filters';
import AssetsFilterButton from '../../components/Assets/AssetsFilter';

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

export const mapStateToProps = ({ assets, selected, assetTypesList, assetModelsList }) => {
  const { assetModels } = assetModelsList;
  const { assetTypes } = assetTypesList;

  return ({
    activePage: assets.activePage,
    isLoading: assets.isLoading,
    selected,
    filterData: createFilterData(assetTypes, assetModels)
  });
};

export default connect(mapStateToProps, {
  getAssetsAction,
  filterSelection
})(AssetsFilterButton);
