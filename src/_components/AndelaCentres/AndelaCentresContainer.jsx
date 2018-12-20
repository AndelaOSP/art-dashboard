import { connect } from 'react-redux';
import { loadOfficeLocations, resetMessage } from '../../_actions/officeLocations.actions';
import AndelaCentresComponent from '../../components/AndelaCentres/AndelaCentresComponent';

export const mapStateToProps = ({ officeLocations }) => {
  const { locationCount, locationList, isLoading, error } = officeLocations;
  return {
    locationCount,
    locationList,
    isLoading,
    error
  };
};

export default connect(mapStateToProps, {
  loadOfficeLocations,
  resetMessage
})(AndelaCentresComponent);
