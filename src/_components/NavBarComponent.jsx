import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';
import { Dropdown, Menu, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/NavBarComponent.css';

export class NavBarComponent extends Component {
  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  }

  render() {
    const { title } = this.props;
    const token = jwt.decode(localStorage.getItem('art-prod-web-token'));
    const { name, picture } = token || {};

    return (
      <div className="navbar">
        <Menu secondary>
          <Menu.Item name="menu" onClick={this.props.toggleVisibility}>
            <Icon name="list layout" />
          </Menu.Item>
          <Menu.Item name={title} />
          <Menu.Menu position="right">
            <Dropdown item text={name || ''} simple>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={this.handleLogout}
                >Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item className="user-avatar">
              <Image src={picture || ''} size="mini" avatar />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

NavBarComponent.propTypes = {
  title: PropTypes.string,
  toggleVisibility: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  push: PropTypes.func
};

NavBarComponent.defaultProps = {
  title: '',
  push: () => { }
};

export default withRouter(NavBarComponent);
