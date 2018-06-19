import React from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/NavBarComponent.css';

const NavBarComponent = (props) => {
  const { title } = props;
  const username = '';

  return (
    <div className="navbar">
      <Menu secondary>
        <Menu.Item name="menu" onClick={props.toggleVisibility}>
          <Icon name="list layout" />
        </Menu.Item>
        <Menu.Item name={title} />
        <Menu.Menu position="right">
          <Dropdown item text={username} icon="user" simple>
            <Dropdown.Menu>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

NavBarComponent.propTypes = {
  title: PropTypes.string.isRequired,
  toggleVisibility: PropTypes.func.isRequired
};
export default NavBarComponent;
