import expect from 'expect';
import { mapStateToProps } from '../../_components/OfficeSections/OfficeSectionsContainer';

describe('mapStateToProps', () => {
  it('returns the expected props', () => {
    const state = {
      officeSections: {
        list: [],
        count: 0,
        isLoading: false,
        error: ''
      }
    };

    const expected = {
      list: [],
      count: 0,
      isLoading: false,
      error: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
