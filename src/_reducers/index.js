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
import filtersReducer from './checkedFilters.reducer';
import visibilityToggleReducer from './navBarToggle.reducer';
import assetStatusReducer from './assetStatus.reducer';
import officeLocations from './officeLocations.reducer';
import filterValuesReducer from './allFilterValues.reducer';
import securityUsersReducer from './securityUsers.reducer';
import accordionReducer from './accordion.reducer';
import logs from './assetLogs.reducer';
import departments from './departments.reducer';
import departmentDetail from './departmentDetail.reducer';
import officeSections from './office-sections.reducer';

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
  selected: filtersReducer,
  navBarVisibility: visibilityToggleReducer,
  assetStatus: assetStatusReducer,
  officeLocations,
  filters: filterValuesReducer,
  securityUsers: securityUsersReducer,
  accordion: accordionReducer,
  logs,
  departments,
  departmentDetail,
  officeSections
});

export default rootReducer;
