import { connect } from 'react-redux';
import {
  resetMessage,
  updateAndelaCentre,
  createOfficeLocation
} from '../../_actions/officeLocations.actions';
import CentreModal from '../../components/AndelaCentres/Temp';

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
  resetMessage,
  updateAndelaCentre,
  createOfficeLocation
})(CentreModal);
