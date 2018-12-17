import React from 'react';
import PropTypes from 'prop-types';
import UserFilterContainer from '../../_components/User/UserFilterContainer';

import '../../_css/UsersComponent.css';

const UserHeader = (props) => {
  if (props.hideHeader) {
    return null;
  }

  return (
    <UserFilterContainer limit={props.limit} />
  );
};

UserHeader.propTypes = {
  hideHeader: PropTypes.bool,
  limit: PropTypes.number
};

export default UserHeader;
