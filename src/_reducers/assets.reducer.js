import constants from '../_constants';
import initialState from './initialState';

const { CREATE_ASSET_SUCCESS, CREATE_ASSET_FAIL } = constants;

export default (state = initialState.assets, action) => {
  switch (action.type) {
    case CREATE_ASSET_SUCCESS:
      return [...state, action.payload];
    case CREATE_ASSET_FAIL:
      return state;
    default:
      return state;
  }
};
