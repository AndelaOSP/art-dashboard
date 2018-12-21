import { connect } from 'react-redux';
import {
  loadSecurityUsers,
  setActivePage,
  resetMessage
} from '../../_actions/securityUsers.actions';
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
  resetMessage
})(UsersComponent);
