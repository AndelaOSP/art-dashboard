// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_TOAST_MESSAGE_CONTENT
} = constants;

export const loadCategoriesDropdown = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });

  return axios.get(`asset-categories/?page=${pageNumber}`)
    .then((response) => {
      const pageLimit = Math.ceil(response.data.count / 10);

      if (pageLimit > 1) {
        dispatch(loadCategoriesSuccess(response.data));
        while (pageNumber < pageLimit) {
          pageNumber += 1;

          if (response.data.next !== '') {
            axios.get(`asset-categories/?page=${pageNumber}`)
              .then((newResponse) => {
                dispatch(loadCategoriesSuccess(newResponse.data));
              })
              .catch((error) => {
                dispatch(loadCategoriesFailure(error));
                dispatch(updateToastMessageContent('Could Not Fetch The Categories', 'error'));
              });
          }
        }
      } else {
        dispatch(loadCategoriesSuccess(response.data));
      }
    })
    .catch((error) => {
      dispatch(loadCategoriesFailure(error));
      dispatch(updateToastMessageContent('Could Not Fetch The Categories', 'error'));
    });
};

/**
 * load Categories thunk
 *
 * @return dispatch type and payload
 */
export const loadCategories = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });

  return axios.get(`asset-categories/?page=${pageNumber}`).then((response) => {
    dispatch(loadCategoriesSuccess(response.data));
  }).catch((error) => {
    dispatch(loadCategoriesFailure(error));
  });
};

/**
 * load Categories Success action creator
 *
 * @param {array} categories list of asset categories
 *
 * @return {object} type and payload
 */
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
      dispatch(updateToastMessageContent('Could Not Save The Category', 'error'));
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

export const updateToastMessageContent = (message, type) => ({
  type: UPDATE_TOAST_MESSAGE_CONTENT,
  payload: {
    message,
    type
  }
});
