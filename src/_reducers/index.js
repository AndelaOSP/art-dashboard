import { combineReducers } from 'redux';

import categoryReducer from './category.reducer';
import subCategoryReducer from './subcategory.reducer';
import assetTypeReducer from './assetType.reducer';
import assetTypesReducer from './assetTypes.reducer';
import assetMake from './assetMake.reducer';
import modelNumber from './modelNumber.reducer';
import assetsReducer from './assets.reducer';
import feedbackReducer from './feedback.reducer';
import toastMessage from './toastMessage.reducer';
import allocationsReducer from './allocations.reducer';

const rootReducer = combineReducers({
  categoriesList: categoryReducer,
  subcategoriesList: subCategoryReducer,
  assetTypesList: assetTypeReducer,
  assetTypeList: assetTypesReducer,
  assetMakesList: assetMake,
  modelNumbersList: modelNumber,
  assets: assetsReducer,
  feedbackReducer,
  toastMessage,
  allocationsList: allocationsReducer,
});

export default rootReducer;
