import constants from '../_constants';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE } = constants;

const initialState = {
  assets: [],
  assetsCount: 0, 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ASSETS_SUCCESS:
      return {
        ...state,
        assets: [...action.payload.data],
        assetsCount: action.payload.headers['x-total-count'],
      }
    case LOAD_ASSETS_FAILURE:
      return {
        ...state,
        assets: [],
        assetsCount: 0,
      }
    default:
      return state;
  }
}
