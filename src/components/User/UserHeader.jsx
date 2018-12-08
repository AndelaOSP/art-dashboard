import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import UserFilterContainer from '../../_components/User/UserFilterContainer';

import '../../_css/UsersComponent.css';

const UserHeader = ({ limit }) => (
  <div className="users-list">
    <div id="page-heading-section">
      <Header as="h1" id="page-headings" floated="left" content="Users" />
      <Divider id="assets-divider" />
      <UserFilterContainer limit={limit} />
    </div>
  </div>
);

UserHeader.propTypes = {
  limit: PropTypes.number
};

export default UserHeader;
