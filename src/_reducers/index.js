import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import assetReducer from './asset.reducer';
import categoryReducer from './category.reducer';
import subCategoryReducer from './subcategory.reducer';
import assetTypeReducer from './assetType.reducer';
import assetMake from './assetMake.reducer';
import modelNumber from './modelNumber.reducer';

const rootReducer = combineReducers({
  loginReducer,
  assetReducer,
  categoriesList: categoryReducer,
  subcategoriesList: subCategoryReducer,
  assetTypesList: assetTypeReducer,
  assetMakesList: assetMake,
  modelNumbersList: modelNumber
});

export default rootReducer;
