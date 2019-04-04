import { connect } from 'react-redux';
import {
  createDepartment
} from '../../_actions/departments.actions';
import CentreModal from '../../components/Departments/Modal';

export const mapStateToProps = ({ officeLocations }) => {
  const {
    countries,
    updateError,
    updateSuccess,
    isLoading,
    createSuccess,
    createFailure
  } = officeLocations;

  const successMessage = updateSuccess || createSuccess;
  const errorMessage = updateError || createFailure;

  return {
    countries,
    isLoading,
    successMessage,
    errorMessage,
    showStatus: !!successMessage || !!errorMessage
  };
};

export default connect(mapStateToProps, {
  createDepartment
})(CentreModal);
