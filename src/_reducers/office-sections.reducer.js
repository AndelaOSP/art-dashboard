import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_OFFICE_SECTIONS_REQUEST,
  LOAD_OFFICE_SECTIONS_SUCCESS,
  LOAD_OFFICE_SECTIONS_FAILURE
} = constants;

export default (state = initialState.officeSections, action) => {
  switch (action.type) {
    case LOAD_OFFICE_SECTIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_OFFICE_SECTIONS_SUCCESS:
      return {
        ...state,
        officeSectionsList: action.payload.results,
        officeSectionsCount: action.payload.count,
        isLoading: false
      };

    case LOAD_OFFICE_SECTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        officeSectionsList: [],
        error: action.payload.message || 'Oops, something went wrong'
      };

    default:
      return state;
  }
};
