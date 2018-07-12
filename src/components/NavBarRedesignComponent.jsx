import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Input, Menu, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/NavBarRedesignComponent.css';

export class NavBarRedesignComponent extends Component {
  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  };

  render() {
    const token = jwt.decode(localStorage.getItem('art-prod-web-token'));
    const { picture } = token || {};

    return (
      <Menu id="navbar" secondary>
        <Menu.Item name="menu" onClick={this.props.toggleVisibility}>
          <Icon id="hamburger" name="bars" />
        </Menu.Item>

        <Menu.Item>
          <Image id="banner" src="/images/andela_logo_blue_landscape.png" />
        </Menu.Item>

        <Menu.Menu id="search-menu">
          <Menu.Item>
            <Input id="nav-search" className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              id="blue-rounded-button"
              size="small"
            >
              +ADD ASSET
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Icon.Group>
              <Icon id="notification-icon" circular inverted name="bell" />
              <Icon corner name="circle" />
            </Icon.Group>
          </Menu.Item>

          <Dropdown
            item
            trigger={<span><Image id="user-avatar" src={picture || ''} avatar /></span>}
            pointing="top left"
            icon={null}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                id="logout"
                onClick={this.handleLogout}
              >Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

NavBarRedesignComponent.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  push: PropTypes.func
};

NavBarRedesignComponent.defaultProps = {
  push: () => {
  }
};

export default withRouter(NavBarRedesignComponent);
