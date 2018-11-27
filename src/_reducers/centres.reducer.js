import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_CENTRES,
  LOAD_CENTRES_SUCCESS,
  LOAD_CENTRES_FAILURE
} = constants;

export default (state = initialState.assetCategories, action) => {
  switch (action.type) {
    case LOAD_CENTRES:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_CENTRES_SUCCESS:
      return {
        ...state,
        centreCount: action.payload.count,
        centreList: action.payload.results,
        isLoading: false
      };

    case LOAD_CENTRES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
