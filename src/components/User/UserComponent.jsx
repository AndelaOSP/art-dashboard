import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import LoaderComponent from '../LoaderComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import UserHeader from './UserHeader';
import StatusMessageComponent from '../common/StatusComponent';
import { isCountCutoffExceeded, constructApiUrl } from '../../_utils/helpers';
import fetchInfo from '../../_utils/ajax';

import UsersContent from './UsersContent';
import Paginator from '../common/PaginationComponent';

import '../../_css/UsersComponent.css';

const CUTOFF_LIMIT = 100;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);

export default class UserComponent extends React.Component {
  state = {
    limit: 10,
    users: [],
    allDataFetched: false
  };

  componentDidMount() {
    const usersEmpty = isEmpty(this.props.users);
    if (usersEmpty) {
      this.props.loadUsers(this.props.activePage, this.state.limit);
    }
    this.props.loadAllFilterValues();
  }

  handleRowChange = (e, data) => {
    this.setState({
      limit: data.value,
      users: []
    });
    this.props.resetUsers();
    this.retrieveUsers(this.props.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.setActivePage(activePage);
    const currentPageList = this.props.users[`page_${activePage}`];
    if (isEmpty(currentPageList)) {
      this.retrieveUsers(activePage, this.state.limit);
    }
  };

  retrieveUsers = (activePage, limit) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      return this.makeAjaxRequest(activePage, limit);
    }
    return this.props.loadUsers(activePage, limit);
  };

  makeAjaxRequest = async (activePage, limit) => {
    const url = constructApiUrl('users', activePage, limit);
    this.props.loading(true);
    const response = await fetchInfo(url);

    this.props.loading(false);

    const { results = {} } = response;
    if (isEmpty(results)) {
      this.setState({ allDataFetched: true });
      return;
    }

    this.setState({ users: results });
  }

  getTotalPages = () => {
    const { usersCount } = this.props;

    if (usersCount <= 1) {
      return 1;
    }

    return Math.ceil(usersCount / this.state.limit);
  };

  render() {
    const {
      activePage,
      users,
      hasError,
      errorMessage,
      isFiltered,
      resetMessage,
      isLoading
    } = this.props;
    const currentUsers = `page_${activePage}`;
    const activePageUsers = users[currentUsers] || this.state.users;
    const hasUsers = !isEmpty(activePageUsers);
    const showStatus = hasError && errorMessage;

    const message = isFiltered
      ? 'No data for that filter. Please try another option.'
      : 'Please try again later, to see if we\'ll have users to show you.';

    return (
      <NavBarComponent title="Users" placeHolder="Search by name... ">
        <UserHeader limit={this.state.limit} />

        {showStatus && (
          <StatusMessageComponent
            message={this.props.errorMessage}
            className="error-status"
            reset={resetMessage}
          />
        )}

        {isLoading && <LoaderComponent />}

        {(!hasUsers && !isLoading) && (
          <ItemsNotFoundComponent
            allDataFetched={this.state.allDataFetched}
            message={message}
          />
        )}

        {!isLoading && (
          <UsersContent users={activePageUsers} hasUsers={hasUsers} />
        )}

        <Paginator
          activePage={activePage}
          handleRowChange={this.handleRowChange}
          handlePaginationChange={this.handlePaginationChange}
          limit={this.state.limit}
          totalPages={this.getTotalPages()}
          isLoading={isLoading}
        />
      </NavBarComponent>
    );
  }
}

UserComponent.propTypes = {
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadUsers: PropTypes.func.isRequired,
  usersCount: PropTypes.number,
  users: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]),
  loadAllFilterValues: PropTypes.func,
  activePage: PropTypes.number,
  resetUsers: PropTypes.func,
  setActivePage: PropTypes.func,
  loading: PropTypes.func,
  resetMessage: PropTypes.func,
  isFiltered: PropTypes.bool
};

UserComponent.defaultProps = {
  errorMessage: '',
  isLoading: false,
  users: []
};
