import React from 'react';
import { Divider, Header } from 'semantic-ui-react';

import NavBarComponent from '../../_components/NavBarContainer';
import TabsComponent from '../../components/common/TabsComponent';
import UserComponent from '../../_components/User/UserContainer';
import SecurityUser from '../../_components/SecurityUser/SecurityUserContainer';

const UsesTabComponent = () => (
  <NavBarComponent>
    <div className="users-list">
      <div id="page-heading-section">
        <Header as="h1" id="page-headings" floated="left" content="Users" />
        <Divider id="assets-divider" />
      </div>

      <TabsComponent panes={[
        {
          header: 'Andelans',
          component: <UserComponent />
        },
        {
          header: 'Security Users',
          component: <SecurityUser />
        }
      ]}
      />
    </div>
  </NavBarComponent>
);

export default UsesTabComponent;
