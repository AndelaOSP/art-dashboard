import axios from 'axios';
import { fetchData } from '../_utils/helpers';
import constructUrl from '../_utils/assets';
import constants from '../_constants';
import { handleAxiosErrors } from '../_utils/ajax';

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
  RESET_UPLOAD_ASSETS,
  UPLOAD_ASSETS_STARTS,
  EXPORT_ASSETS_SUCCESS,
  EXPORT_ASSETS_FAILURE
} = constants;

export const getAssetsAction = (pageNumber, limit, filters = {}, status = '') => {
  const url = constructUrl(pageNumber, limit, filters, status);

  return (dispatch) => {
    dispatch(loading(true));

    return fetchData(url)
      .then((response) => {
        dispatch(loading(false));
        dispatch(getAssetsSuccess(response.data, status, filters));
      })
      .catch((error) => {
        dispatch(loading(false));
        dispatch(getAssetsFailure(error.message, status), filters);
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
      const message = handleAxiosErrors(error);
      dispatch(uploadAssetsFailure(message));
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
      const downloadedFile = window.URL.createObjectURL(new Blob([response.data]));
      dispatch(uploading(false));
      dispatch(downloadSuccess(downloadedFile));
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

const getAssetsSuccess = (data, status = 'all', filters = {}) => ({
  type: LOAD_ASSETS_SUCCESS,
  payload: data,
  status,
  filters
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

export const exportAssetsAction = status => (dispatch) => {
  const url = (status) ? `export-assets/?current_status=${status}` : 'export-assets/';
  return axios.get(url)
    .then(response => dispatch(exportAssetsSuccsess(response.data)))
    .catch(error => dispatch(exportAssetsFailure(error.message)));
};

const exportAssetsSuccsess = data => ({
  type: EXPORT_ASSETS_SUCCESS,
  payload: data
});

const exportAssetsFailure = message => ({
  type: EXPORT_ASSETS_FAILURE,
  payload: message
});
