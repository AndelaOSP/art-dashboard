import constants from '../_constants';
import initialState from './initialState';

const { SET_ACTIVE_PAGE } = constants;

export default (state = initialState.activePage, action) => {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return action.activePage;
    default:
      return state;
  }
};
