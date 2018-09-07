import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Header, Divider } from 'semantic-ui-react';
import NavbarComponent from '../../components/NavBarComponent';
import UserDetailComponent from '../../components/User/UserDetailComponent';
import { loadUserDetail } from '../../_actions/user.actions';

class UserDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: props.location.state || {},
      hasError: props.hasError,
      errorMessage: props.errorMessage
    };
  }

  componentDidMount() {
    const { match, location } = this.props;

    if (location.state === undefined) {
      this.props.loadUserDetail(parseInt(match.params.id, 10));
    }
  }

  render() {
    const foundUser = isEmpty(this.state.userDetail) ?
      this.props.userDetail : this.state.userDetail;

    return (
      <NavbarComponent title="Users">
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
            userDetail={foundUser}
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
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  userDetail: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

UserDetailContainer.defaultTypes = {
  isLoading: false,
  hasError: false,
  errorMessage: ''
};

const mapStateToProps = ({ userDetails }) => {
  const { isLoading, hasError, errorMessage, userDetail } = userDetails;

  return {
    userDetail,
    isLoading,
    hasError,
    errorMessage
  };
};


export default connect(mapStateToProps, {
  loadUserDetail
})(UserDetailContainer);
