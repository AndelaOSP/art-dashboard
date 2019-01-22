import { connect } from 'react-redux';
import { loadAssetCategories } from '../../_actions/assetCategories.actions';
import { AssetCategoriesComponent } from '../../components/Category/AssetCategoriesComponent';

export const mapStateToProps = ({ assetCategories }) => {
  const { categories, assetCategoriesCount, isLoading, hasError } = assetCategories;
  return {
    categories,
    assetCategoriesCount,
    isLoading,
    hasError
  };
};

export default connect(mapStateToProps, { loadAssetCategories })(AssetCategoriesComponent);
