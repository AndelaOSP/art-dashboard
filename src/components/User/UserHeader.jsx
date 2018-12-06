import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import UserFilterContainer from '../../_components/User/UserFilterContainer';

import '../../_css/UsersComponent.css';

const UserHeader = (props) => {
  if (props.hideHeader) {
    return null;
  }

  return (
    <div className="users-list">
      <div id="page-heading-section">
        <Header as="h1" id="page-headings" floated="left" content="Users List" />
        <Divider id="assets-divider" />
        <UserFilterContainer limit={props.limit} />
      </div>
    </div>
  );
};

UserHeader.propTypes = {
  hideHeader: PropTypes.bool,
  limit: PropTypes.number
};

export default UserHeader;
