import { connect } from 'react-redux';
import { loadOfficeLocations, resetMessage, createOfficeLocation, loadCountries } from '../../_actions/officeLocations.actions';
import AndelaCentresComponent from '../../components/AndelaCentres/AndelaCentresComponent';

export const mapStateToProps = ({ officeLocations }) => {
  const { locationCount, locationList, isLoading, error, countries } = officeLocations;
  return {
    locationCount,
    locationList,
    isLoading,
    error,
    countries: countries.results
  };
};

export default connect(mapStateToProps, {
  loadOfficeLocations,
  resetMessage,
  createOfficeLocation,
  loadCountries
})(AndelaCentresComponent);
