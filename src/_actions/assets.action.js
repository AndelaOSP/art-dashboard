import { fetchData } from '../_utils/helpers';
import { constructUrl } from '../_utils/assets';
import constants from '../_constants';

const {
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS,
  SET_ACTIVE_PAGE,
  RESET_ASSETS
} = constants;

/* eslint-disable import/prefer-default-export */
export const getAssetsAction = (pageNumber, limit, filters, status = '') => {
  const url = constructUrl(pageNumber, limit, filters, status);

  return (dispatch) => {
    dispatch(loading(true));

    return fetchData(url)
      .then((response) => {
        dispatch(loading(false));
        dispatch(getAssetsSuccess(response.data, status));
      })
      .catch((error) => {
        dispatch(loading(false));
        dispatch(getAssetsFailure(error.message, status));
      });
  };
};

export const setActivePage = page => dispatch => dispatch(setActivePageSuccess(page));

export const loading = isLoading => ({
  type: LOAD_ASSETS_STARTS,
  isLoading
});

const getAssetsSuccess = (data, status = 'all') => ({
  type: LOAD_ASSETS_SUCCESS,
  payload: data,
  status
});

const getAssetsFailure = (message, status = 'all') => ({
  type: LOAD_ASSETS_FAILURE,
  payload: message,
  status
});

const setActivePageSuccess = page => ({
  type: SET_ACTIVE_PAGE,
  payload: page
});

export const resetAssets = () => ({
  type: RESET_ASSETS
});
