import { connect } from 'react-redux';
import {
  createDepartment
} from '../../_actions/departments.actions';
import CentreModal from '../../components/Departments/Modal';

export const mapStateToProps = ({ departments }) => {
  const {
    updateError,
    updateSuccess,
    isLoading,
    createSuccess,
    createFailure
  } = departments;

  const successMessage = updateSuccess || createSuccess;
  const errorMessage = updateError || createFailure;

  return {
    isLoading,
    successMessage,
    errorMessage,
    showStatus: !!successMessage || !!errorMessage
  };
};

export default connect(mapStateToProps, {
  createDepartment
})(CentreModal);
