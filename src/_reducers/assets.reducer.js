import constants from '../_constants';
import initialState from './initialState';
import findAssetIndexAndPage from '../_utils/assets';

const {
  CREATE_ASSET_REQUEST,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS,
  SET_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE,
  RESET_ASSETS,
  UPDATE_ASSET_REQUEST,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL
} = constants;

// Currently the API returns three error messages. All are within objects with asset_code,
//  serial_number and non_field_errors as the keys. The use of .replace() is due to the fact
// that the response is not as well structured. e.g. {"asset_code": {"['error message']"}}
// TODO: The error messages should be updated once the API returns the error messages
// in a better format
const getErrorMessage = (error) => {
  if (error.hasOwnProperty('asset_code')) {
    return error.asset_code[0].replace(/[[\]']/g, '');
  }

  if (error.hasOwnProperty('serial_number')) {
    return error.serial_number[0].replace(/[[\]']/g, '');
  }

  if (error.hasOwnProperty('non_field_errors')) {
    return error.non_field_errors[0]; // eslint-disable-line
  }

  return '';
};

const updateAssetList = (asset, assetList) => {
  const assetLocation = findAssetIndexAndPage(asset, assetList);

  if (!assetLocation) {
    return assetList;
  }

  const { page, index } = assetLocation;
  const pageData = assetList[page];

  pageData[index] = asset;

  return {
    ...assetList,
    [page]: pageData
  };
};

export default (state = initialState.assets, action) => {
  switch (action.type) {
    case CREATE_ASSET_REQUEST:
      return {
        ...state,
        hasError: false,
        isLoading: true,
        success: '',
        errorMessage: ''
      };

    case CREATE_ASSET_SUCCESS:
      return {
        ...state,
        assetsList: { [`page_${state.activePage}`]: [action.payload] },
        assetsCount: state.assetsCount + 1,
        hasError: false,
        isLoading: false,
        success: 'Hoooray! Asset successfully created. You can create another one or head on to view all assets.',
        errorMessage: ''
      };

    case CREATE_ASSET_FAIL:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        success: '',
        errorMessage: getErrorMessage(action.payload.response.data)
      };

    case RESET_STATUS_MESSAGE: {
      return {
        ...state,
        success: '',
        errorMessage: ''
      };
    }

    case LOAD_ASSETS_STARTS:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case LOAD_ASSETS_SUCCESS:
      return {
        ...state,
        assetsList: {
          ...state.assetsList,
          [`page_${state.activePage}`]: action.payload.results
        },
        assetsCount: action.payload.count,
        hasError: false,
        isLoading: action.isLoading
      };

    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };

    case LOAD_ASSETS_FAILURE:
      return {
        ...state,
        assetsList: [],
        assetsCount: 0,
        errorMessage: action.payload,
        hasError: true,
        isLoading: action.isLoading
      };

    case RESET_ASSETS:
      return {
        ...state,
        assetsList: {}
      };

    case UPDATE_ASSET_REQUEST:
      return {
        ...state,
        updateLoading: true,
        success: '',
        errorMessage: ''
      };

    case UPDATE_ASSET_SUCCESS:
      return {
        ...state,
        assetsList: updateAssetList(action.payload, state.assetsList),
        updateLoading: false,
        success: 'Asset successfully updated.',
        errorMessage: ''
      };

    case UPDATE_ASSET_FAIL:
      return {
        ...state,
        updateLoading: false,
        success: '',
        errorMessage: 'Could not update asset.'
      };

    default:
      return state;
  }
};
