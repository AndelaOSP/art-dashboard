import { connect } from 'react-redux';
import {
  loadOfficeLocations,
  resetMessage,
  // updateAndelaCentre,
  // createOfficeLocation,
  loadCountries
} from '../../_actions/officeLocations.actions';
import AndelaCentresComponent from '../../components/AndelaCentres/AndelaCentresComponent';

export const mapStateToProps = ({ officeLocations }) => {
  const {
    locationCount,
    locationList,
    isLoading,
    error,
    countries,
    updateError,
    updateSuccess
  } = officeLocations;

  return {
    locationCount,
    locationList,
    isLoading,
    error,
    countries,
    updateError,
    updateSuccess,
    entity: 'andela-centres'
  };
};

export default connect(mapStateToProps, {
  loadOfficeLocations,
  resetMessage,
  // createOfficeLocation,
  loadCountries
  // updateAndelaCentre
})(AndelaCentresComponent);
