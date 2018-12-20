import { connect } from 'react-redux';

import { addSecurityUser, resetMessage } from '../../_actions/securityUsers.actions';
import AddSecurityUserComponent from '../../components/SecurityUser/AddSecurityUserComponent';

export const mapStateToProps = ({ securityUsers }) => {
  const { errorMessage, successMessage, isLoading } = securityUsers;

  return {
    successMessage,
    errorMessage,
    isLoading
  };
};

export default connect(mapStateToProps, {
  addSecurityUser,
  resetMessage
})(AddSecurityUserComponent);
