import { connect } from 'react-redux';
import {
  createOfficeBlock
} from '../../_actions/officeLocations.actions';
import OfficeBlocksModal from '../../components/OfficeBlocks/Modal';

export const mapStateToProps = ({ officeLocations }) => {
  const {
    updateError,
    updateSuccess,
    isLoading,
    createSuccess,
    createFailure,
    locationList
  } = officeLocations;

  const successMessage = updateSuccess || createSuccess;
  let errorMessage = updateError || createFailure;
  errorMessage = (errorMessage.non_field_errors) ? errorMessage.non_field_errors[0] : errorMessage;

  return {
    isLoading,
    successMessage,
    errorMessage,
    locationList,
    showStatus: !!successMessage || !!errorMessage
  };
};

export default connect(mapStateToProps, {
  createOfficeBlock
})(OfficeBlocksModal);
