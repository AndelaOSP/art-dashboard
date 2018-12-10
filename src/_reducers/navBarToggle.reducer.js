import constants from '../_constants';
import initialState from './initialState';

const { TOGGLE_NAVIGATION_BAR_VISIBILITY } = constants;

const visibilityToggleReducer = (state = initialState.navBarVisibility, action) => {
  switch (action.type) {
    case TOGGLE_NAVIGATION_BAR_VISIBILITY: {
      return {
        ...state,
        isVisible: !state.isVisible
      };
    }

    default:
      return state;
  }
};

export default visibilityToggleReducer;
