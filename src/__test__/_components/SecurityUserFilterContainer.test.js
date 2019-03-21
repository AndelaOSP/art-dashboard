import expect from 'expect';
import { securityUsers } from '../../_mock/users';
import { mapStateToProps, userFilterData } from '../../_components/User/SecurityUserFilter';

describe('Render <UserFilterButton /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      usersList: {
        isLoading: false,
        activePage: 1
      },
      selected: [],
      filters: {
        Active: []
      }
    };

    const expected = {
      isLoading: false,
      activePage: 1,
      selected: [],
      filterData: [
        {
          title: 'Active',
          content: [{ id: 1, option: 'true' }, { id: 2, option: 'false' }]
        }
      ]
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('calls userFilterData', () => {
    expect(userFilterData(securityUsers).length).toEqual(1);
  });
});
