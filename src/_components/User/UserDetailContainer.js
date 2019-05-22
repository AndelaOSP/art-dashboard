import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Header, Divider } from 'semantic-ui-react';
import NavBarComponent from '../NavBarContainer';
import UserDetailComponent from '../../components/User/UserDetailComponent';
import { loadUserDetail as getUserDetail, updateUserDetail } from '../../_actions/user.actions';

class UserDetailContainer extends Component {
  componentDidMount() {
    const { match, userDetail, loadUserDetail } = this.props;
    if (isEmpty(userDetail)) {
      loadUserDetail(+match.params.id);
    }
  }

  render() {
    return (
      <NavBarComponent title="Users">
        <div className="users-list">
          <div id="page-heading-section">
            <Header
              as="h1"
              id="page-headings"
              floated="left"
              content="User"
            />
            <Divider id="assets-divider" />
          </div>
          <UserDetailComponent
            userDetail={this.props.userDetail}
            errorMessage={this.props.errorMessage}
            successMessage={this.props.successMessage}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
            updateUserDetail={this.props.updateUserDetail}
          />
        </div>
      </NavBarComponent>
    );
  }
}

UserDetailContainer.propTypes = {
  loadUserDetail: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  userDetail: PropTypes.object,
  updateUserDetail: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  successMessage: PropTypes.string
};

UserDetailContainer.defaultTypes = {
  isLoading: false,
  hasError: false,
  errorMessage: ''
};

export const mapStateToProps = ({ userDetails }, props) => {
  const { isLoading, hasError, successMessage, errorMessage, userDetail } = userDetails;
  return {
    userDetail: isEmpty(userDetail) ? props.location.state : userDetail,
    isLoading,
    hasError,
    successMessage,
    errorMessage
  };
};

export default connect(mapStateToProps, {
  loadUserDetail: getUserDetail,
  updateUserDetail
})(UserDetailContainer);
