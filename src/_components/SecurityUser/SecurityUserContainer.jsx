import { connect } from 'react-redux';
import {
  loadSecurityUsers,
  setActivePage,
  resetMessage
} from '../../_actions/securityUsers.actions';
import SecurityUser from '../../components/SecurityUser/SecurityUserComponent';

export const mapStateToProps = ({ securityUsers }) => {
  const {
    activePage,
    usersList,
    usersCount,
    errorMessage,
    isLoading
  } = securityUsers;
  return {
    usersList,
    usersCount,
    errorMessage,
    isLoading,
    activePage
  };
};

export default connect(mapStateToProps, {
  loadSecurityUsers,
  setActivePage,
  resetMessage
})(SecurityUser);
