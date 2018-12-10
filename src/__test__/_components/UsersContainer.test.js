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
      }
    };

    const expected = {
      isLoading: false,
      users: [],
      usersCount: 0,
      errorMessage: '',
      hasError: false,
      activePage: 1,
      isFiltered: false
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
