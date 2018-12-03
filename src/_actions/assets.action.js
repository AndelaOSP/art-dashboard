import axios from 'axios';
import { fetchData } from '../_utils/helpers';
import { constructUrl } from '../_utils/assets';
import constants from '../_constants';

const {
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS,
  SET_ACTIVE_PAGE,
  RESET_ASSETS,
  UPLOAD_ASSETS_SUCCESS,
  UPLOAD_ASSETS_FAILURE,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILURE,
  RESET_STATUS_MESSAGE,
  RESET_UPLOAD_ASSETS,
  UPLOAD_ASSETS_STARTS
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

export const uploadAssets = file => (dispatch) => {
  const formData = new FormData();
  formData.append('file', file[0]);
  dispatch(uploading(true));
  return axios
    .post('upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      dispatch(uploading(false));
      dispatch(uploadAssetsSuccsess(response.data));
    })
    .catch((error) => {
      dispatch(uploading(false));
      dispatch(uploadAssetsFailure(error.message));
    });
};

export const downloadFile = url => (dispatch) => {
  dispatch(uploading(true));
  return axios({
    url,
    method: 'GET',
    responseType: 'blob'
  })
    .then((response) => {
      const downloadedFIle = window.URL.createObjectURL(new Blob([response.data]));
      dispatch(uploading(false));
      dispatch(downloadSuccess(downloadedFIle));
      dispatch(resetUploadStatus());
    })
    .catch((error) => {
      dispatch(uploading(false));
      dispatch(downloadFailure(error.message));
    });
};

export const setActivePage = page => dispatch => dispatch(setActivePageSuccess(page));

export const loading = isLoading => ({
  type: LOAD_ASSETS_STARTS,
  isLoading
});

export const uploading = isUpLoading => ({
  type: UPLOAD_ASSETS_STARTS,
  isUpLoading
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

const uploadAssetsSuccsess = data => ({
  type: UPLOAD_ASSETS_SUCCESS,
  payload: data
});

const uploadAssetsFailure = message => ({
  type: UPLOAD_ASSETS_FAILURE,
  payload: message
});

const downloadSuccess = data => ({
  type: DOWNLOAD_FILE_SUCCESS,
  payload: data
});

const downloadFailure = message => ({
  type: DOWNLOAD_FILE_FAILURE,
  payload: message
});

const setActivePageSuccess = page => ({
  type: SET_ACTIVE_PAGE,
  payload: page
});

export const resetAssets = () => ({
  type: RESET_ASSETS
});

export const resetUploadAssets = () => ({
  type: RESET_UPLOAD_ASSETS
});
const resetUploadStatus = () => ({
  type: RESET_STATUS_MESSAGE
});
