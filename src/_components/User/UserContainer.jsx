import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavBarComponent from '../NavBarContainer';
import UserComponent from '../../components/User/UserComponent';
import { loadUsers, setActivePage, resetUsers, loading } from '../../_actions/users.actions';
import '../../_css/UsersComponent.css';
import FilterComponent from '../../components/FilterUserComponent';
import FilterButton from '../../components/common/FilterButton';
import AddSecurityUserContainer from '../../_components/User/AddSecurityUserContainer';
import ModalComponent from '../../components/common/ModalComponent';
import { isCountCutoffExceeded, fetchData } from '../../_utils/helpers';

const CUTOFF_LIMIT = 20;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);

export class UserContainer extends Component {
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
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.resetUsers();
    this.setState({ users: [] });
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

  toggleFilter = () => {
    this.setState(({ toggleOn }) => ({ toggleOn: !toggleOn }));
  };

  render() {
    const currentUsers = `page_${this.props.activePage}`;
    const { users } = this.state;

    return (
      <NavBarComponent title="Users">
        <div className="users-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Users List" />
            <Divider id="assets-divider" />
            <div className="user-list-content">
              <ModalComponent
                trigger={
                  <Button id="add-security-user" size="small">
                    + ADD SECURITY USER
                  </Button>
                }
                modalTitle="Add Security User"
              >
                <AddSecurityUserContainer />
              </ModalComponent>
              <FilterButton render={toggleOn => <FilterComponent toggleOn={toggleOn} />} />
            </div>
          </div>
          <UserComponent
            activePage={this.props.activePage}
            activePageUsers={this.props.users[currentUsers] || users}
            emptyUsersList={this.emptyUsersList}
            errorMessage={this.props.errorMessage}
            handlePageTotal={this.handlePageTotal}
            handleRowChange={this.handleRowChange}
            handlePaginationChange={this.handlePaginationChange}
            handleViewAsset={this.handleViewAsset}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
            limit={this.state.limit}
            allDataFetched={this.state.allDataFetched}
          />
        </div>
      </NavBarComponent>
    );
  }
}

UserContainer.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  usersCount: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resetUsers: PropTypes.bool.isRequired,
  activePage: PropTypes.number,
  setActivePage: PropTypes.func,
  loading: PropTypes.func
};

UserContainer.defaultProps = {
  users: [],
  errorMessage: '',
  activePage: 1
};

const mapStateToProps = ({ usersList }) => {
  const { users, usersCount, errorMessage, hasError, isLoading, activePage } = usersList;
  return {
    users,
    usersCount,
    errorMessage,
    hasError,
    isLoading,
    activePage
  };
};

export default connect(mapStateToProps, {
  loadUsers,
  setActivePage,
  resetUsers,
  loading
}
)(UserContainer);
