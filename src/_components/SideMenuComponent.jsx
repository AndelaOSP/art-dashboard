import React, { Component } from 'react';
import { Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBarComponent from './NavBarComponent';

import '../_css/SideMenuComponent.css';

/** Side menu component
 *
 * @class SideMenuComponent
 * @extends {Component}
 */
class SideMenuComponent extends Component {
  state = { visible: true };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  /**
   *
   * @returns {JSX} JSX
   * @memberof SideMenuComponent
   */
  render() {
    const { visible } = this.state;
    const { title } = this.props;

    return (
      <div className="wrapper">
        <NavBarComponent
          title={title}
          toggleVisibility={this.toggleVisibility}
        />
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="scale down"
            width="wide"
            visible={visible}
            icon="labeled"
            vertical
          >
            <Menu.Item name="art" className="logo">
              <Image
                centered
                src="http://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png" // eslint-disable-line max-len
                alt="Andela logo"
                id="andela-logo"
              />
            </Menu.Item>
            <Menu.Item name="analytics">
              <span><Icon name="bar graph" />Analytics</span>
            </Menu.Item>
            <Menu.Item name="users">
              <span><Icon name="users" />Users</span>
            </Menu.Item>
            <Menu.Item name="assets">
              <Link to="/assets"><Icon name="tv" />Assets</Link>
            </Menu.Item>
            <Menu.Item name="reports">
              <span><Icon name="tasks" />Reports</span>
            </Menu.Item>
            <Menu.Item name="feedback">
              <span><Icon name="address card" />Feedback</span>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

SideMenuComponent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default SideMenuComponent;

