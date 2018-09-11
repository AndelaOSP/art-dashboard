import { combineReducers } from 'redux';

import categoryReducer from './category.reducer';
import subCategoryReducer from './subcategory.reducer';
import assetTypeReducer from './assetType.reducer';
import assetTypesReducer from './assetTypes.reducer';
import assetMake from './assetMake.reducer';
import modelNumber from './modelNumber.reducer';
import assetModels from './assetModels.reducer';
import assetsReducer from './assets.reducer';
import assetReducer from './asset.reducer';
import feedbackReducer from './userFeedback.reducer';
import toastMessage from './toastMessage.reducer';
import allocationsReducer from './allocations.reducer';
import loadIncidenceReportsReducer from './incidenceReports.reducer';
import loadAssetCategoriesReducer from './assetCategories.reducer';
import assetConditionReducer from './assetCondition.reducer';
import usersReducer from './users.reducer';
import userDetails from './user.reducer';
import loadAssetSpecsReducer from './assetSpecs.reducer';
import sessionReducer from './session.reducer';
import activePagereducer from './pagination.reducer';

const rootReducer = combineReducers({
  categoriesList: categoryReducer,
  subcategoriesList: subCategoryReducer,
  assetTypesList: assetTypesReducer,
  assetTypeList: assetTypeReducer,
  assetMakesList: assetMake,
  modelNumbersList: modelNumber,
  assetModelsList: assetModels,
  assets: assetsReducer,
  asset: assetReducer,
  incidenceReports: loadIncidenceReportsReducer,
  feedbackReducer,
  toastMessage,
  allocationsList: allocationsReducer,
  assetCategories: loadAssetCategoriesReducer,
  assetConditions: assetConditionReducer,
  usersList: usersReducer,
  userDetails,
  assetSpecs: loadAssetSpecsReducer,
  session: sessionReducer,
  activePage: activePagereducer
});

export default rootReducer;
