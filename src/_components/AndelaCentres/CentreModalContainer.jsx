import { connect } from 'react-redux';
import { resetMessage } from '../../_actions/officeLocations.actions';
import CentreModal from '../../components/AndelaCentres/CentreModal';

export const mapStateToProps = ({ officeLocations }) => {
  const {
    countries,
    updateError,
    updateSuccess,
    isLoading,
    createSuccess,
    createFailure
  } = officeLocations;

  return {
    countries,
    isLoading,
    successMessage: updateSuccess || createSuccess,
    errorMessage: updateError || createFailure,
    showStatus: updateError || updateSuccess || createSuccess || createFailure
  };
};

export default connect(mapStateToProps, { resetMessage })(CentreModal);
