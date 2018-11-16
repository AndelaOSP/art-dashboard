import constants from '../_constants';

const { UPDATE_ADMIN_STATUS } = constants;

export const updateAdminStatus = isAdmin => ({
  type: UPDATE_ADMIN_STATUS,
  isAdmin
});

export default updateAdminStatus;
