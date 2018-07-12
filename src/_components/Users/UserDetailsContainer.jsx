import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SideMenuComponent from '../../_components/SideMenuComponent';
import UserDetailsComponent from '../../components/Users/UserDetailsComponent';
import loadUsers from '../../_actions/users.actions';

export class UserDetailsContainer extends Component {
  state = {

  }

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <SideMenuComponent title="Users">
        <Container>
          <Header className="users-heading" content="users" />
          <UserDetailsComponent />
        </Container>
      </SideMenuComponent>
    );
  }
}

UserDetailsContainer.propTypes = {
  loadUsers: PropTypes.func
};

const mapStateToProps = ({ usersList }) => ({
  users: usersList
});

export default connect(mapStateToProps, {
  loadUsers
})(UserDetailsContainer);
