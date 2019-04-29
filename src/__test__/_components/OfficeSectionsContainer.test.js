import expect from 'expect';
import { mapStateToProps } from '../../_components/OfficeSections/OfficeSectionsContainer';

describe('Renders <Office Sections /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      officeSections: {
        officeSectionsList: [],
        officeSectionsCount: 0,
        isLoading: false,
        error: ''
      }
    };

    const expected = {
      officeSectionsList: [],
      officeSectionsCount: 0,
      isLoading: false,
      error: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
