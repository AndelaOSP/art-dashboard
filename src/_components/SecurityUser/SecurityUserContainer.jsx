import { connect } from 'react-redux';
import {
  loadSecurityUsers,
  setActivePage,
  resetMessage
} from '../../_actions/securityUsers.actions';
import { loadAllFilterValues } from '../../_actions/allFilterValues.actions';
import { loading, resetUsers } from '../../_actions/users.actions';
import UsersComponent from '../../components/User/UsersComponent';

export const mapStateToProps = ({ securityUsers }) => {
  const {
    activePage,
    usersList,
    usersCount,
    errorMessage,
    isLoading
  } = securityUsers;
  return {
    users: usersList,
    usersCount,
    errorMessage,
    isLoading,
    activePage,
    entity: 'security-users'
  };
};

export default connect(mapStateToProps, {
  loadUsers: loadSecurityUsers,
  setActivePage,
  resetMessage,
  loadAllFilterValues,
  loading,
  resetUsers
})(UsersComponent);
