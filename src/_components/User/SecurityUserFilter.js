import { connect } from 'react-redux';
import { loadUsers } from '../../_actions/users.actions';
import filterSelection from '../../_actions/checkedFilters.actions';
import UserFilter from '../../components/common/Filter/Filter';

export const userFilterData = () => {
  const formattedStatus = [{ id: 1, option: 'active' }, { id: 2, option: 'in active' }];

  return [
    {
      title: 'Status',
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
    loadUsers,
    filterSelection
  }
)(UserFilter);
