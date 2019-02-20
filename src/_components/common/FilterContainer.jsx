import { connect } from 'react-redux';
import FilterComponent from '../../components/common/Filter/FilterComponent';
import { loadAccordionValue } from '../../_actions/allFilterValues.actions';


export const mapStateToProps = (state) => {
  const { activeIndex } = state.accordion;
  return {
    activeIndex
  };
};

export default connect(mapStateToProps, {
  loadAccordionValue
})(FilterComponent);
