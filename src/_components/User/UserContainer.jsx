import { connect } from 'react-redux';
import { loadAllFilterValues } from '../../_actions/allFilterValues.actions';
import { loadUsers, setActivePage, resetUsers, loading, resetMessage } from '../../_actions/users.actions';
import UserFilter from '../../components/User/UserFilter';

export const mapStateToProps = ({ usersList, selected }) => {
  const {
    activePage,
    users,
    usersCount,
    errorMessage,
    hasError,
    isLoading,
    isFiltered
  } = usersList;
  return {
    users,
    usersCount,
    errorMessage,
    hasError,
    isLoading,
    activePage,
    isFiltered,
    selected,
    entity: 'users'
  };
};

export default connect(mapStateToProps, {
  loadUsers,
  setActivePage,
  resetUsers,
  loading,
  loadAllFilterValues,
  resetMessage
})(UserFilter);
