import constants from '../_constants';

const { SET_ACTIVE_PAGE } = constants;

const setActivePage = activePage => ({
  type: SET_ACTIVE_PAGE,
  activePage
});

export default setActivePage;
