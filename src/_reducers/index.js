import { combineReducers } from 'redux';

import categoryReducer from './category.reducer';
import subCategoryReducer from './subcategory.reducer';
import assetTypeReducer from './assetType.reducer';
import assetTypesReducer from './assetTypes.reducer';
import assetMake from './assetMake.reducer';
import modelNumber from './modelNumber.reducer';
import assetModels from './assetModels.reducer';
import assetsReducer from './assets.reducer';
import feedbackReducer from './userFeedback.reducer';
import toastMessage from './toastMessage.reducer';
import allocationsReducer from './allocations.reducer';
import loadIncidenceReportsReducer from './incidenceReports.reducer';
import loadAssetCategoriesReducer from './assetCategories.reducer';

const rootReducer = combineReducers({
  categoriesList: categoryReducer,
  subcategoriesList: subCategoryReducer,
  assetTypesList: assetTypesReducer,
  assetTypeList: assetTypeReducer,
  assetMakesList: assetMake,
  modelNumbersList: modelNumber,
  assetModelsList: assetModels,
  assets: assetsReducer,
  incidenceReports: loadIncidenceReportsReducer,
  feedbackReducer,
  toastMessage,
  allocationsList: allocationsReducer,
  assetCategories: loadAssetCategoriesReducer
});

export default rootReducer;
