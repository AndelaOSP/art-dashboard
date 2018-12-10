import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Segment, Header, Divider, Button } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import rowOptions from '../../_utils/pageRowOptions';
import { isCountCutoffExceeded, fetchData } from '../../_utils/helpers';

import DropdownComponent from '../common/DropdownComponent';
import TableRow from '../TableRowComponent';
import LoaderComponent from '../LoaderComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import StatusMessageComponent from '../common/StatusComponent';

import '../../_css/UsersComponent.css';

const CUTOFF_LIMIT = 100;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);

export default class SecurityUserComponent extends React.Component {
  state = {
    limit: 10,
    securityUsers: [],
    allDataFetched: false
  };

  componentDidMount() {
    const usersEmpty = isEmpty(this.props.usersList);

    if (usersEmpty) {
      this.props.loadSecurityUsers(this.props.activePage, this.state.limit);
    }
  }

  handleRowChange = (e, data) => {
    this.setState({
      limit: data.value,
      securityUsers: []
    });
    this.props.resetUsers();
    this.retrieveSecurityUsers(this.props.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    const currentPageList = this.props.usersList[`page_${activePage}`];

    this.props.setActivePage(activePage);

    if (isEmpty(currentPageList)) {
      this.retrieveSecurityUsers(activePage, this.state.limit);
    }
  };

  retrieveSecurityUsers = (activePage, limit) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      const url = `security-users?page=${activePage}&page_size=${limit}`;

      return fetchData(url).then((response) => {
        this.setState({ securityUsers: response.data.results });
      }).catch(() => {
        this.setState({ allDataFetched: true });
      });
    }

    return this.props.loadSecurityUsers(activePage, limit);
  };

  handlePageTotal = () => Math.ceil(this.props.usersCount / this.state.limit);

  emptyUsersList = () => (isEmpty(this.props.usersList));

  render() {
    const currentUsers = `page_${this.props.activePage}`;
    const activePageUsers = this.props.usersList[currentUsers] || this.state.securityUsers;
    const hasNoUsers = isEmpty(activePageUsers);
    const showStatus = this.props.errorMessage;

    if (this.props.isLoading) {
      return <LoaderComponent />;
    }

    if (hasNoUsers) {
      const message = 'Please try again later, to see if we\'ll have security users to show you.';

      return (
        <NavBarComponent>
          <div className="users-list">
            <div id="page-heading-section">
              <Header as="h1" id="page-headings" floated="left" content="Security Users" />
              <Divider id="assets-divider" />
            </div>
          </div>

          <ItemsNotFoundComponent
            allDataFetched={this.state.allDataFetched}
            message={message}
          />
        </NavBarComponent>
      );
    }

    return (
      <NavBarComponent title="Users" placeHolder="Search by name... ">
        <div className="users-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Security Users" />
            <Divider id="assets-divider" />
            <Link to="/security-users/create">
              <Button className="filter-button">
                ADD SECURITY USER
              </Button>
            </Link>
          </div>
        </div>

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
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email Address</Table.HeaderCell>
              <Table.HeaderCell>Badge No.</Table.HeaderCell>
              <Table.HeaderCell>Phone No.</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              activePageUsers.map((securityUser) => {
                const viewUserUrl = `security-users/${securityUser.id}/view`;

                return (
                  <TableRow
                    viewDetailsRoute={viewUserUrl}
                    key={securityUser.id}
                    data={securityUser}
                    headings={['first_name', 'last_name', 'email', 'badge_number', 'phone_number']}
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

SecurityUserComponent.propTypes = {
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  loadSecurityUsers: PropTypes.func.isRequired,
  usersCount: PropTypes.number,
  usersList: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]),
  activePage: PropTypes.number,
  resetUsers: PropTypes.func,
  setActivePage: PropTypes.func,
  resetMessage: PropTypes.func
};

SecurityUserComponent.defaultProps = {
  errorMessage: '',
  isLoading: false,
  usersList: []
};
