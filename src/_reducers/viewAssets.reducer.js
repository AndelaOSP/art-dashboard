import constants from '../_constants';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE, LOAD_ASSETS_STARTS } = constants;

const initialState = {
  assets: [],
  assetsCount: 0,
  hasError: false,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ASSETS_STARTS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_ASSETS_SUCCESS:
      return {
        ...state,
        assets: [...action.payload],
        assetsCount: action.payload.length,
        hasError: false,
        isLoading: false,
      };
    case LOAD_ASSETS_FAILURE:
      return {
        ...state,
        assets: [],
        assetsCount: 0,
        hasError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
