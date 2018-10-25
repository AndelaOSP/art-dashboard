import expect from 'expect';
import visibilityToggleReducer from '../../_reducers/navBarToggle.reducer';
import constants from '../../_constants';

const { TOGGLE_NAVIGATION_BAR_VISIBILITY } = constants;

const initialState = { isVisible: true };

const action = { payload: {} };

describe('NavBar Visibility Toggle Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(visibilityToggleReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle VISIBILITY_TOGGLED when navbar is toggled', () => {
    action.type = TOGGLE_NAVIGATION_BAR_VISIBILITY;
    action.isVisible = false;
    expect(visibilityToggleReducer(initialState, action).isVisible).toEqual(false);
  });
});
