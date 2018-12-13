import React from 'react';

import NavBarComponent from '../../_components/NavBarContainer';
import TabsComponent from '../../components/common/TabsComponent';
import UserComponent from '../../_components/User/UserContainer';
import SecurityUser from '../../_components/SecurityUser/SecurityUserContainer';

const UsesTabComponent = () => (
  <NavBarComponent>
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
  </NavBarComponent>
);

export default UsesTabComponent;
