import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import LoaderComponent from '../../components/LoaderComponent';

import '../../_css/UsersComponent.scss';

const UserDetailComponent = (props) => {
  if (props.isLoading) {
    return (
      <LoaderComponent />
    );
  }

  if (isEmpty(props.userDetail)) {
    return (
      <div>
        User Not Found
      </div>
    );
  }
  return (
    <div>User Details HERe</div>
  );
};

UserDetailComponent.propTypes = {
  isLoading: PropTypes.bool,
  userDetail: PropTypes.object
};

UserDetailComponent.defaultTypes = {
  isLoading: false,
  userDetail: {}
};


export default UserDetailComponent;
