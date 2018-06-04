import { combineReducers } from 'redux';

import categoryReducer from './category.reducer';
import subCategoryReducer from './subcategory.reducer';
import assetTypeReducer from './assetType.reducer';
import assetMake from './assetMake.reducer';
import modelNumber from './modelNumber.reducer';
import assetsReducer from './assets.reducer';
import viewAssets from './viewAssets.reducer';

const rootReducer = combineReducers({
  categoriesList: categoryReducer,
  subcategoriesList: subCategoryReducer,
  assetTypesList: assetTypeReducer,
  assetMakesList: assetMake,
  modelNumbersList: modelNumber,
  assetsList: assetsReducer,
  viewAssets
});

export default rootReducer;
