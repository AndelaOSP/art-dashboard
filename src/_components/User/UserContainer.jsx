import { connect } from 'react-redux';
import { loadAllFilterValues } from '../../_actions/allFilterValues.actions';
import { loadUsers, setActivePage, resetUsers, loading, resetMessage } from '../../_actions/users.actions';
import User from '../../components/User/UserComponent';

export const mapStateToProps = ({ usersList }) => {
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
})(User);
