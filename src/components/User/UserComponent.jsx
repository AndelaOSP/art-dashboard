import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Segment } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../common/DropdownComponent';
import TableRow from '../TableRowComponent';
import LoaderComponent from '../LoaderComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import UserHeader from './UserHeader';
import StatusMessageComponent from '../common/StatusComponent';
import { isCountCutoffExceeded, fetchData } from '../../_utils/helpers';

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
      const url = `users?page=${activePage}&page_size=${limit}`;
      this.props.loading(true);
      return fetchData(url).then((response) => {
        this.props.loading(false);
        this.setState({ users: response.data.results });
      }).catch(() => {
        this.props.loading(false);
        this.setState({ allDataFetched: true });
      });
    }
    return this.props.loadUsers(activePage, limit);
  };

  handlePageTotal = () => Math.ceil(this.props.usersCount / this.state.limit);

  emptyUsersList = () => (isEmpty(this.props.users));

  render() {
    const currentUsers = `page_${this.props.activePage}`;
    const activePageUsers = this.props.users[currentUsers] || this.state.users;
    const hasNoUsers = isEmpty(activePageUsers);
    const showStatus = this.props.hasError && this.props.errorMessage;

    if (this.props.isLoading) {
      return <LoaderComponent />;
    }

    if (hasNoUsers) {
      const message = this.props.isFiltered
        ? 'No data for that filter. Please try another option.'
        : 'Please try again later, to see if we\'ll have users to show you.';

      return (
        <NavBarComponent>
          <UserHeader
            hideHeader={!this.props.isFiltered}
            limit={this.state.limit}
          />
          <ItemsNotFoundComponent
            allDataFetched={this.state.allDataFetched}
            message={message}
          />
        </NavBarComponent>
      );
    }

    return (
      <NavBarComponent title="Users" placeHolder="Search by name... ">
        <UserHeader limit={this.state.limit} />

        {
            showStatus && (
              <StatusMessageComponent
                message={this.props.errorMessage}
                className="error-status"
                reset={this.props.resetMessage}
              />
            )
          }

        <Table basic selectable className="users-list">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email Address</Table.HeaderCell>
              <Table.HeaderCell>Cohort</Table.HeaderCell>
              <Table.HeaderCell>Assets Assigned</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
                activePageUsers.map((user) => {
                  const viewUserUrl = `users/${user.id}/view`;

                  const updatedUser = {
                    ...user,
                    assets_assigned: user.allocated_asset_count
                  };

                  return (
                    <TableRow
                      viewDetailsRoute={viewUserUrl}
                      key={user.id}
                      data={updatedUser}
                      headings={['full_name', 'email', 'cohort', 'assets_assigned']}
                    />
                  );
                })
              }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              {!this.emptyUsersList() && (
              <Table.HeaderCell colSpan="4" id="pagination-header">
                <Segment.Group horizontal id="art-pagination-section">
                  <Segment>
                    <Pagination
                      id="art-pagination-component"
                      totalPages={this.handlePageTotal() || 1}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.props.activePage}
                    />
                  </Segment>
                  <Segment>
                    <DropdownComponent
                      customClass="page-limit"
                      placeHolder="Show Rows"
                      options={rowOptions}
                      upward
                      value={this.state.limit}
                      onChange={this.handleRowChange}
                    />
                  </Segment>
                </Segment.Group>
              </Table.HeaderCell>
                )}
            </Table.Row>
          </Table.Footer>
        </Table>
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
