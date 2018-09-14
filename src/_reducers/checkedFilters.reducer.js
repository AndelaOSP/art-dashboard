import constants from '../_constants';
import initialState from './initialState';

const { FILTER_SELECTED } = constants;

const filtersReducer = (state = initialState.checkedFilters, action) => {
  switch (action.type) {
    case FILTER_SELECTED: {
      const { selection, filterType } = action;
      const previousSelected = state[filterType] || [];

      return {
        ...state,
        [filterType]: selection.isChecked
          ? add(selection.label, previousSelected)
          : remove(selection.label, previousSelected)
      };
    }

    default:
      return state;
  }
};

const add = (value, list) => ([...list, value]);

const remove = (value, list) => list.filter(item => item !== value);

export default filtersReducer;
