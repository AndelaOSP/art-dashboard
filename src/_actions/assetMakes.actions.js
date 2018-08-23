import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';
// constants
const {
  LOAD_ASSET_MAKES_SUCCESS,
  LOAD_ASSET_MAKES_FAILURE,
  LOADING_ASSET_MAKES,
  ADD_ASSET_MAKE_SUCCESS,
  ADD_ASSET_MAKE_FAILURE,
  DROPDOWN_ASSET_MAKES_SUCCESS
} = constants;

/**
 * load asset makes thunk
 * @return dispatch loadAssetMakesSuccess type and payload
 */
export const loadAssetMakes = (pageNumber, limit) => (dispatch) => {
  dispatch(loading(true));
  return axios.get(`asset-makes?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadAssetMakesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loadAssetMakesFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};

export const loadAssetMakesDropdown = () => (dispatch) => {
  dispatch(loading(true));
  return axios.get('asset-makes/?paginate=false')
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadDropdownSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loadAssetMakesFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};


export const addAssetMakes = newMake => (dispatch =>
  axios
    .post('asset-makes', newMake)
    .then((response) => {
      dispatch(addAssetMakesSuccess(response.data));
      dispatch(updateToastMessageContent('New Asset Make Saved Successfully',
        'success'));
    })
    .catch((error) => {
      dispatch(addAssetMakesFailure(error));
      dispatch(updateToastMessageContent('Could Not Save The Asset Make',
        'error'));
    })
);

export const addAssetMakesSuccess = assetMakes => ({
  type: ADD_ASSET_MAKE_SUCCESS, payload: assetMakes
});

const addAssetMakesFailure = error => ({
  type: ADD_ASSET_MAKE_FAILURE, payload: error.message
});

const loading = loadState => ({
  type: LOADING_ASSET_MAKES,
  loadState
});

const loadAssetMakesSuccess = makes => ({
  type: LOAD_ASSET_MAKES_SUCCESS, payload: makes
});

const loadAssetMakesFailure = error => ({
  type: LOAD_ASSET_MAKES_FAILURE, payload: error.message
});

const loadDropdownSuccess = makes => ({
  type: DROPDOWN_ASSET_MAKES_SUCCESS, payload: makes
});
