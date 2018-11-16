import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateAdminStatus } from '../../_actions/admin.actions';
import { AdminVerificationComponent } from '../../components/AdminVerification/AdminVerificationComponent';

export const mapStateToProps = ({ admin: { isAdmin } }) => ({ isAdmin });

export default withRouter(connect(mapStateToProps, {
  updateAdminStatus
})(AdminVerificationComponent));
