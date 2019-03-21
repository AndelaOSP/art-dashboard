import { connect } from 'react-redux';
import filterSelection from '../../_actions/checkedFilters.actions';
import UserFilter from '../../components/common/Filter/Filter';

export const userFilterData = () => [
  {
    title: 'Active',
    content: [{ id: 1, option: 'true' }, { id: 2, option: 'false' }]
  }
];

export const mapStateToProps = ({ usersList, selected }) => ({
  activePage: usersList.activePage,
  isLoading: usersList.isLoading,
  selected,
  filterData: userFilterData()
});

export default connect(
  mapStateToProps,
  {
    filterSelection
  }
)(UserFilter);
