import constants from '../_constants';

const { SESSION_EXPIRED } = constants;

/**
 * load Asset Type thunk
 *
 * @return dispatch type and payload
 */
export const expireSession = isSessionExpired => ({ type: SESSION_EXPIRED, isSessionExpired });

export default expireSession;
