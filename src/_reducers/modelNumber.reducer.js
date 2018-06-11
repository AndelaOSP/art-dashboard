import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ASSET_MODEL_NUMBERS,
  CREATE_MODEL_NUMBER_SUCCESS,
  CREATE_MODEL_NUMBER_FAILURE
} = constants;

export default (state = initialState.assetMakes, action) => {
  switch (action.type) {
    case LOAD_ASSET_MODEL_NUMBERS:
      return action.payload
    case CREATE_MODEL_NUMBER_SUCCESS:
      return {
        ...state,
        modelNumbers: [...state.modelNumbers]

     }
    case CREATE_MODEL_NUMBER_FAILURE:
     return {
      ...state,
      modelNumbers: []
     }
    default:
      return state;
  }
};
