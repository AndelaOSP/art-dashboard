import { connect } from 'react-redux';
import {
  updateAndelaCentre
} from '../../_actions/officeLocations.actions';
import CentreModal from '../../components/AndelaCentres/Modal';

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
  updateAndelaCentre
})(CentreModal);
