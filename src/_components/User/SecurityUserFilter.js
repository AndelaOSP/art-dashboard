import { connect } from 'react-redux';
import filterSelection from '../../_actions/checkedFilters.actions';
import UserFilter from '../../components/common/Filter/Filter';

export const userFilterData = () => {
  const formattedStatus = [{ id: 1, option: 'true' }, { id: 2, option: 'false' }];

  return [
    {
      title: 'Active',
      content: formattedStatus
    }
  ];
};

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
