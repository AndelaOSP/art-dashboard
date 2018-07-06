import constants from '../_constants';

const {
  LOADING_ASSET_MODELS,
  LOAD_ASSET_MODELS_SUCCESS,
  LOAD_ASSET_MODELS_FAILURE
} = constants;

const initialState = {
  assetModels: [],
  assetModelsCount: 0,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ASSET_MODELS:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_ASSET_MODELS_SUCCESS:
      return {
        ...state,
        assetModels: [...action.payload.results],
        assetModelsCount: action.payload.count,
        isLoading: false
      };

    case LOAD_ASSET_MODELS_FAILURE:
      return {
        ...state,
        assetModels: [],
        assetModelsCount: 0,
        isLoading: false
      };

    default:
      return state;
  }
};
