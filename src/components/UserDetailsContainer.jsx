import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavbarComponent from './NavBarComponent';
import UserDetailsComponent from '../components/UserDetailsComponent';
import Users from '../_actions/users.actions';

export class UserDetailsContainer extends Component {
  state = {
    activePage: 1,
    limit: 10
  }
  componentDidMount() {
    this.props.Users(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.Users(activePage, this.state.limit);
  }

  handlePageTotal = () => Math.ceil(this.props.usersCount / this.state.limit)

  emptyUsersList = () => (isEmpty(this.props.users));

  render() {
    return (
      <NavbarComponent title="Users">
        <Container>
          <Header className="landing-heading" content="Users" />
          <UserDetailsComponent
            activePage={this.state.activePage}
            activePageUsers={this.props.users}
            emptyUsersList={this.emptyUsersList}
            errorMessage={this.props.errorMessage}
            handlePageTotal={this.handlePageTotal}
            handlePaginationChange={this.handlePaginationChange}
            handleViewAsset={this.handleViewAsset}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
          />
        </Container>
      </NavbarComponent>
    );
  }
}

UserDetailsContainer.propTypes = {
  Users: PropTypes.func.isRequired,
  usersCount: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

UserDetailsContainer.defaultProps = {
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
  Users
})(UserDetailsContainer);
