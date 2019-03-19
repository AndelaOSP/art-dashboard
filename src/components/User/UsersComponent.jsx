import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Button } from 'semantic-ui-react';

import LoaderComponent from '../LoaderComponent';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import StatusMessageComponent from '../common/StatusComponent';
import { isCountCutoffExceeded, constructApiUrl } from '../../_utils/helpers';
import fetchInfo from '../../_utils/ajax';

import UsersContent from './UsersContent';
import Paginator from '../common/PaginationComponent';
import UserFilter from '../../_components/User/UserFilterContainer';
import Securityuser from '../../_components/User/SecurityUserFilter';
import ModalComponent from '../common/ModalComponent';

import '../../_css/UsersComponent.css';
import AddSecurityUserContainer from '../../_components/SecurityUser/AddSecurityUserContainer';

const CUTOFF_LIMIT = 100;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);

export default class UserComponent extends React.Component {
  state = {
    limit: 10,
    users: [],
    allDataFetched: false,
    modalOpen: false
  };

  componentDidMount() {
    const shouldFetchUsers = this.checkIfShouldFetchUsers();
    if (shouldFetchUsers) {
      this.props.loadUsers(this.props.activePage, this.state.limit);
    }
    this.props.loadAllFilterValues();
  }

  checkIfShouldFetchUsers = () => {
    const { activePage, users } = this.props;
    const pageKey = `page_${activePage}`;
    const activePageUsers = users[pageKey] || this.state.users;

    return isEmpty(activePageUsers);
  };

  handleRowChange = (e, data) => {
    const { activePage, selected } = this.props;
    this.setState({
      limit: data.value,
      users: []
    });
    this.props.resetUsers();
    this.retrieveUsers(activePage, data.value, selected);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.setActivePage(activePage);
    const currentPageList = this.props.users[`page_${activePage}`];
    if (isEmpty(currentPageList)) {
      this.retrieveUsers(activePage, this.state.limit, this.props.selected);
    }
  };

  handleToggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  retrieveUsers = (activePage, limit, filters) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      return this.makeAjaxRequest(activePage, limit);
    }
    return this.props.loadUsers(activePage, limit, filters);
  };

  makeAjaxRequest = async (activePage, limit) => {
    const { entity, loading, selected = {} } = this.props;
    const url = constructApiUrl(entity, activePage, limit, { filters: selected });
    const response = await fetchInfo(url, loading);

    const { results = {} } = response;
    if (isEmpty(results)) {
      return this.setState({ allDataFetched: true });
    }

    return this.setState({ users: results });
  };

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
      isLoading,
      entity
    } = this.props;
    const currentUsers = `page_${activePage}`;
    const activePageUsers = users[currentUsers] || this.state.users;
    const hasUsers = !isEmpty(activePageUsers);
    const showStatus = hasError && errorMessage;
    const isUsersPage = entity === 'users';

    const message = isFiltered
      ? 'No data for that filter. Please try another option.'
      : `Please try again later, to see if we'll have ${entity.replace('-', ' ')} to show you.`;

    return (
      <Fragment>
        {isUsersPage && (
          <UserFilter
            limit={this.state.limit}
            data-test="user-filter"
            filterAction={this.props.loadUsers}
          />
        )}

        {!isUsersPage && (
          <React.Fragment>
            <ModalComponent
              trigger={<Button className="filter-button">ADD SECURITY USER</Button>}
              modalTitle="Add Security User"
              toggleModal={this.handleToggleModal}
              modalOpen={this.state.modalOpen}
            >
              <AddSecurityUserContainer />
            </ModalComponent>

            <Securityuser
              limit={this.state.limit}
              data-test="user-filter"
              filterAction={this.props.loadUsers}
            />
          </React.Fragment>
        )}

        {showStatus && (
          <StatusMessageComponent
            message={this.props.errorMessage}
            className="error-status"
            reset={resetMessage}
          />
        )}

        {isLoading && <LoaderComponent />}

        {!hasUsers && !isLoading && (
          <ItemsNotFoundComponent allDataFetched={this.state.allDataFetched} message={message} />
        )}

        {!isLoading && <UsersContent users={activePageUsers} hasUsers={hasUsers} entity={entity} />}

        <Paginator
          activePage={activePage}
          handleRowChange={this.handleRowChange}
          handlePaginationChange={this.handlePaginationChange}
          limit={this.state.limit}
          totalPages={this.getTotalPages()}
          isLoading={isLoading}
        />
      </Fragment>
    );
  }
}

UserComponent.propTypes = {
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadUsers: PropTypes.func.isRequired,
  usersCount: PropTypes.number,
  users: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  loadAllFilterValues: PropTypes.func,
  activePage: PropTypes.number,
  resetUsers: PropTypes.func,
  setActivePage: PropTypes.func,
  loading: PropTypes.func,
  resetMessage: PropTypes.func,
  isFiltered: PropTypes.bool,
  selected: PropTypes.object,
  entity: PropTypes.string
};

UserComponent.defaultProps = {
  errorMessage: '',
  isLoading: false,
  users: [],
  loadAllFilterValues: () => {},
  loading: () => {},
  resetUsers: () => {}
};
