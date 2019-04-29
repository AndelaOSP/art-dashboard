import { connect } from 'react-redux';
import loadOfficeSections from '../../_actions/officeSections.actions';
import OfficeSections from '../../components/OfficeSections/OfficeSectionsComponent';

export const mapStateToProps = ({ officeSections }) => {
  const {
    officeSectionsList,
    officeSectionsCount,
    isLoading,
    error
  } = officeSections;

  return {
    officeSectionsList,
    officeSectionsCount,
    isLoading,
    error
  };
};

export default connect(mapStateToProps, {
  loadOfficeSections
})(OfficeSections);
