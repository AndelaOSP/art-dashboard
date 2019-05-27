import { connect } from 'react-redux';
import loadOfficeSections from '../../_actions/officeSections.actions';
import OfficeSections from '../../components/OfficeSections/OfficeSectionsComponent';

export const mapStateToProps = ({ officeSections }) => {
  const {
    list,
    count,
    isLoading,
    error
  } = officeSections;

  return {
    list,
    count,
    isLoading,
    error
  };
};

export default connect(mapStateToProps, {
  loadOfficeSections
})(OfficeSections);
