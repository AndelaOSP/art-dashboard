import expect from 'expect';
import accordionReducer from '../../_reducers/accordion.reducer';
import constants from '../../_constants';

const {
  ACTIVE_ACCORDION
} = constants;

const initialState = {
  accordion: {
    activeIndex: 0
  }
};

const action = { index: {} };

describe('Accordion Reducer', () => {
  it('should return initial state when there is no action', () => {
    expect(accordionReducer(initialState, action).accordion).toEqual(initialState.accordion);
  });

  it('should handle ACTIVE_ACCORDION', () => {
    action.type = ACTIVE_ACCORDION;
    action.index = 2;
    expect(accordionReducer(initialState, action).activeIndex).toEqual(2);
  });
});
