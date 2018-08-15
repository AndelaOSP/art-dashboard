import constants from '../_constants';

const { SESSION_EXPIRED, SESSION_UNEXPIRED } = constants;

/**
 * load Asset Type thunk
 *
 * @return dispatch type and payload
 */
export const expireSession = () => ({ type: SESSION_EXPIRED });

export const unexpireSession = () => ({ type: SESSION_UNEXPIRED });

export default { expireSession, unexpireSession };
