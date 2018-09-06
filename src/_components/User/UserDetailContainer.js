import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Header, Divider } from 'semantic-ui-react';
import NavbarComponent from '../../components/NavBarComponent';
import UserDetailComponent from '../../components/User/UserDetailComponent';
import { loadUserDetail } from '../../_actions/user.actions';

let TheUSer = {};

class UserDetailContainer extends Component {
  state = {
    userDetail: {},
    hasError: this.props.hasError,
    errorMessage: this.props.errorMessage
  }

  componentDidMount() {
    const { match, users } = this.props;
    const userId = parseInt(match.params.id, 10);

    const userDetail = users.find(specificUser => specificUser.id === userId);

    if (userDetail !== undefined) {
      // this.setState({ userDetail });
      TheUSer = userDetail;
    } else {
      this.props.loadUserDetail(userId);
    }
  }

  checkForPropsOrState = () => (
    isEmpty(this.props.userDetail) ?
      this.state.userDetail : this.props.userDetail
  )

  render() {
    return (
      <NavbarComponent title="Users">

        <div className="users-list">
          <div id="page-heading-section">
            <Header
              as="h1"
              id="page-headings"
              floated="left"
              content="User Detail"
            />
            <Divider id="assets-divider" />
          </div>
          <UserDetailComponent
            userDetail={TheUSer}
            errorMessage={this.state.errorMessage}
            hasError={this.state.hasError}
            isLoading={this.props.isLoading}
          />
        </div>
      </NavbarComponent>
    );
  }
}

UserDetailContainer.propTypes = {
  loadUserDetail: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  userDetail: PropTypes.object,
  match: PropTypes.object.isRequired

};

UserDetailContainer.defaultTypes = {
  users: [],
  isLoading: false,
  hasError: false,
  errorMessage: ''
};

const mapStateToProps = ({ usersList, userDetails }) => {
  const { users } = usersList;
  const { isLoading, hasError, errorMessage, userDetail } = userDetails;

  return {
    users,
    userDetail,
    isLoading,
    hasError,
    errorMessage
  };
};


export default connect(mapStateToProps, {
  loadUserDetail
})(UserDetailContainer);
