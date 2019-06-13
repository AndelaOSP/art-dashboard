import { connect } from 'react-redux';
import {
  loadOfficeBlocks,
  resetMessage,
  loadOfficeLocations,
  loadCentreOfficeBlocks
} from '../../_actions/officeLocations.actions';
import OfficeBlocksComponent from '../../components/OfficeBlocks/OfficeBlocksComponent';

export const mapStateToProps = ({ officeLocations }) => {
  const {
    blockCount,
    blockList,
    isLoading,
    error,
    updateError,
    updateSuccess,
    locationList
  } = officeLocations;

  return {
    blockCount,
    blockList,
    isLoading,
    error,
    updateError,
    updateSuccess,
    locationList,
    entity: 'office-blocks'
  };
};

export default connect(mapStateToProps, {
  loadOfficeBlocks,
  resetMessage,
  loadOfficeLocations,
  loadCentreOfficeBlocks
})(OfficeBlocksComponent);
