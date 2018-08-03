// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  DROPDOWN_CATEGORIES_SUCCESS
} = constants;

export const loadCategoriesDropdown = () => (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });

  return axios.get('asset-categories/?paginate=false')
    .then(response =>
      dispatch(loadCategoriesDropdownSuccess(response.data))
    )
    .catch((error) => {
      dispatch(loadCategoriesFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};

export const loadCategoriesDropdownSuccess = categories => ({
  type: DROPDOWN_CATEGORIES_SUCCESS, payload: categories
});

export const loadCategories = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });

  return axios.get(`asset-categories/?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loadCategoriesSuccess(response.data));
    }).catch((error) => {
      dispatch(loadCategoriesFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};

export const loadCategoriesSuccess = categories => ({
  type: LOAD_CATEGORIES_SUCCESS, payload: categories
});

export const loadCategoriesFailure = error => ({
  type: LOAD_CATEGORY_FAILURE, payload: error
});

export const createCategory = newCategory => (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });

  return axios.post('asset-categories', newCategory)
    .then((response) => {
      dispatch(createCategorySuccess(response.data));
      dispatch(updateToastMessageContent('New Category Saved Successfully', 'success'));
    })
    .catch((error) => {
      dispatch(createCategoryFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};

export const createCategorySuccess = category => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: category
});

export const createCategoryFailure = error => ({
  type: CREATE_CATEGORY_FAILURE,
  payload: error
});

