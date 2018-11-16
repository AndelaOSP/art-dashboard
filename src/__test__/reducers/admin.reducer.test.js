import expect from 'expect';
import constants from '../../_constants';
import adminReducer from '../../_reducers/admin.reducer';

const {
  UPDATE_ADMIN_STATUS
} = constants;

const initialState = {
  isAdmin: false
};

const action = { payload: {} };

describe('Admin reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(adminReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle UPDATE_ADMIN_STATUS', () => {
    action.type = UPDATE_ADMIN_STATUS;
    action.isAdmin = true;

    expect(adminReducer(initialState, action).isAdmin).toEqual(true);
  });
});
