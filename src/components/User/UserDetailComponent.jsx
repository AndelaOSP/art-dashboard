import React from 'react';
// import PropTypes from 'prop-types';
// import { isEmpty } from 'lodash';
import { Header, Divider } from 'semantic-ui-react';
import NavbarComponent from '../NavBarComponent';

import '../../_css/UsersComponent.scss';

const UserDetailComponent = () => (
  <NavbarComponent title="Assets">
    <div className="users-list">
      <div id="page-heading-section">
        <Header as="h1" id="page-headings" floated="left" content="User Detail" />
        <Divider id="assets-divider" />
      </div>
    </div>
  </NavbarComponent>
);


export default UserDetailComponent;
