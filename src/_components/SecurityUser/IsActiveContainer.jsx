import { connect } from 'react-redux';
import { updateActiveStatus } from '../../_actions/securityUsers.actions';
import IsActiveComponent from '../../components/SecurityUser/IsActiveComponent';

export default connect(null, { updateActiveStatus })(IsActiveComponent);
