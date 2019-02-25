import constants from '../_constants';
import initialState from './initialState';

const { ACTIVE_ACCORDION } = constants;

const accordionReducer = (state = initialState.accordion, action) => {
  switch (action.type) {
    case ACTIVE_ACCORDION: {
      return {
        ...state,
        activeIndex: action.index
      };
    }
    default:
      return state;
  }
};

export default accordionReducer;
