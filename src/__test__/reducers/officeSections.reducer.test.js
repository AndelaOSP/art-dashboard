
import expect from 'expect';
import officeSectionsReducer from '../../_reducers/officeSections.reducer';
import mockStore from '../../_mock/mockStore';
import officeSections from '../../_mock/officeSections';
import constants from '../../_constants';

const {
  LOAD_OFFICE_SECTIONS_REQUEST,
  LOAD_OFFICE_SECTIONS_SUCCESS,
  LOAD_OFFICE_SECTIONS_FAILURE
} = constants;

const action = { payload: {} };

describe('Office Section Reducer tests', () => {
  it('should handle LOAD_OFFICE_SECTIONS_REQUEST', () => {
    action.type = LOAD_OFFICE_SECTIONS_REQUEST;
    action.isLoading = true;
    expect(officeSectionsReducer(mockStore.officeSections, action).list).toEqual([]);
    expect(officeSectionsReducer(mockStore.officeSections, action).isLoading).toEqual(true);
  });

  it('should handle LOAD_OFFICE_SECTIONS_SUCCESS', () => {
    action.type = LOAD_OFFICE_SECTIONS_SUCCESS;
    action.payload.results = officeSections.results;
    expect(officeSectionsReducer(mockStore.officeSections, action).list
    ).toEqual(action.payload.results);
  });

  it('should handle LOAD_OFFICE_SECTIONS_FAILURE', () => {
    action.type = LOAD_OFFICE_SECTIONS_FAILURE;
    expect(officeSectionsReducer(mockStore.officeSections, action).list).toEqual([]);
    expect(officeSectionsReducer(mockStore.officeSections, action).isLoading).toEqual(false);
  });
});
