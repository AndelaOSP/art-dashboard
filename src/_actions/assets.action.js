import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS,
  SET_ACTIVE_PAGE
} = constants;

/* eslint-disable import/prefer-default-export */
export const getAssetsAction = (pageNumber, limit, filters) => {
  let url = `manage-assets?page=${pageNumber}&page_size=${limit}`;

  if (filters) {
    url = `manage-assets?page=${pageNumber}&page_size=${limit}&asset_type=${filters['Asset Types'] || ''}&model_number=${filters['Model Numbers'] || ''}`;
  }

  return (dispatch) => {
    dispatch(loading(true));
    return axios.get(url)
      .then((response) => {
        dispatch(loading(false));
        dispatch(getAssetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loading(false));
        dispatch(getAssetsFailure(error.message));
      });
  };
};

export const setActivePage = page => dispatch => dispatch(setActivePageSuccess(page));

const loading = isLoading => ({
  type: LOAD_ASSETS_STARTS,
  isLoading
});

const getAssetsSuccess = data => ({
  type: LOAD_ASSETS_SUCCESS,
  payload: data
});

const getAssetsFailure = message => ({
  type: LOAD_ASSETS_FAILURE,
  payload: message
});

const setActivePageSuccess = page => ({
  type: SET_ACTIVE_PAGE,
  payload: page
});
