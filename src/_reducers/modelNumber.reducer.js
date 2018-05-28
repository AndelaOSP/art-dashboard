import constants from '../_constants';
import initialState from './initialState';

const { LOAD_ASSET_MODEL_NUMBERS } = constants;

export default (state = initialState.assetMakes, action) => {
  switch (action.type) {
    case LOAD_ASSET_MODEL_NUMBERS:
      return action.payload;
    default:
      return state;
  }
};
