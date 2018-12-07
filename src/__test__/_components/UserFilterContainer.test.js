import expect from 'expect';
import { cohorts, allocatedAssets } from '../../_mock/filters';
import { mapStateToProps, userFilterData } from '../../_components/User/UserFilterContainer';

describe('Render <UserFilterButton /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      usersList: {
        isLoading: false,
        activePage: 1
      },
      selected: [],
      filters: {
        cohorts: [],
        allocatedAssets: []
      }
    };

    const expected = {
      isLoading: false,
      activePage: 1,
      selected: [],
      filterData: []
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('calls userFilterData', () => {
    expect(userFilterData(cohorts, allocatedAssets).length).toEqual(2);
  });
});
