import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

const NavBarComponent = (props) => {
    const { title } = props;
    const token = jwt.decode(localStorage.getItem('token'));
    let username = '';

    if (token != null) {
      username = token.username;
    }

    return (
      <div className='navbar'>
        <Menu secondary stackable>
          <Menu.Item name='menu' onClick={props.toggleVisibility} >
            <Icon name='list layout' />
          </Menu.Item>
          <Menu.Item name={ title } />
          <Menu.Menu position='right'>
            <Dropdown item text={ username } item icon='user' simple>
              <Dropdown.Menu>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    );
};

export default NavBarComponent;
