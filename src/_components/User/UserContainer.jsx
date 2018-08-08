import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavbarComponent from './NavBarComponent';
import UserDetailsComponent from '../components/UserDetailsComponent';
import { loadUsers } from '../_actions/users.actions';
import '../_css/UsersComponent.css';
import FilterComponent from './FilterComponent';


export class UserContainer extends Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadUsers(this.state.activePage, this.state.limit);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hasError &&
      (this.props.errorMessage === nextProps.errorMessage)) {
      return false;
    }
    return true;
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadUsers(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadUsers(activePage, this.state.limit);
  };

  handlePageTotal = () => Math.ceil(this.props.usersCount / this.state.limit);

  emptyUsersList = () => (isEmpty(this.props.users));

  toggleFilter = () => {
    this.setState(({ toggleOn }) => ({ toggleOn: !toggleOn }));
  }

  render() {
    return (
      <NavbarComponent title="Users">
        <div className="users-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Users List" />
            <Divider id="assets-divider" />
            <div
              className={this.state.toggleOn ? 'clicked' : 'unclicked'}
              id="filter-button"
              onClick={this.toggleFilter}
              role="presentation"
            >
              {this.state.toggleOn ?
                <div id="close-filter">
                  close X
                </div> :
                <div id="lines">
                  <div className="burger-line" />
                  <div className="burger-line" />
                  <div className="burger-line" />
                </div>
              }
              FILTERS
            </div>
          </div>
          {this.state.toggleOn ? <FilterComponent /> : null}
          <UserDetailsComponent
            activePage={this.state.activePage}
            activePageUsers={this.props.users}
            emptyUsersList={this.emptyUsersList}
            errorMessage={this.props.errorMessage}
            handlePageTotal={this.handlePageTotal}
            handleRowChange={this.handleRowChange}
            handlePaginationChange={this.handlePaginationChange}
            handleViewAsset={this.handleViewAsset}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
            limit={this.state.limit}
          />
        </div>
      </NavbarComponent>
    );
  }
}

UserContainer.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  usersCount: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

UserContainer.defaultProps = {
  users: [],
  errorMessage: ''
};

const mapStateToProps = ({ usersList }) => {
  const { users, usersCount, errorMessage, hasError, isLoading } = usersList;
  return {
    users,
    usersCount,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  loadUsers
})(UserContainer);
