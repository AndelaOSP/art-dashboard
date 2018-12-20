import expect from 'expect';
import { mapStateToProps } from '../../_components/SecurityUser/SecurityUserContainer';

describe('<SecurityUserContainer /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      securityUsers: {
        usersList: [],
        usersCount: 0,
        errorMessage: '',
        successMessage: '',
        isLoading: false,
        activePage: 1
      }
    };

    const expected = {
      isLoading: false,
      users: [],
      usersCount: 0,
      errorMessage: '',
      activePage: 1,
      entity: 'security-users'
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
