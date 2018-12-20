import expect from 'expect';
import { mapStateToProps } from '../../_components/SecurityUser/AddSecurityUserContainer';

it('calls mapStateToProps', () => {
  const state = {
    securityUsers: {
      usersList: [],
      usersCount: 0,
      successMessage: '',
      errorMessage: '',
      isLoading: false,
      activePage: 1
    }
  };

  const expected = {
    successMessage: '',
    errorMessage: '',
    isLoading: false
  };

  expect(mapStateToProps(state)).toEqual(expected);
});
