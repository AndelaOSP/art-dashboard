import { combineReducers } from 'redux';
import assetReducer from './asset.reducer';
import categoryReducer from './category.reducer';
import subCategoryReducer from './subcategory.reducer';
import assetTypeReducer from './assetType.reducer';
import assetMake from './assetMake.reducer';
import modelNumber from './modelNumber.reducer';
import assetsReducer from './assets.reducer';

const rootReducer = combineReducers({
  assetReducer,
  categoriesList: categoryReducer,
  subcategoriesList: subCategoryReducer,
  assetTypesList: assetTypeReducer,
  assetMakesList: assetMake,
  modelNumbersList: modelNumber,
  assetsList: assetsReducer
});

export default rootReducer;
