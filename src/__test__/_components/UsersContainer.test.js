import expect from 'expect';
import { mapStateToProps } from '../../_components/User/UserContainer';

describe('Render <User /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      usersList: {
        users: [],
        usersCount: 0,
        errorMessage: '',
        hasError: false,
        isLoading: false,
        isFiltered: false,
        activePage: 1
      },
      selected: {}
    };

    const expected = {
      isLoading: false,
      users: [],
      usersCount: 0,
      errorMessage: '',
      hasError: false,
      activePage: 1,
      isFiltered: false,
      selected: {},
      entity: 'users'
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
