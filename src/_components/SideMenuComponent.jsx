import React, { Component } from 'react';
import { Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

import NavBarComponent from './NavBarComponent';

import '../_css/SideMenuComponent.css';

class SideMenuComponent extends Component {
  state = { visible: true };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    const { title } = this.props;

    return (
      <div className='wrapper'>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide out' width='wide' visible={visible} icon='labeled' vertical>
            <Menu.Item name='art' className='logo'>
              <Image
                centered
                src='http://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png'
                alt='Andela logo'
                id="andela-logo"
              />
            </Menu.Item>
            <Menu.Item name='analytics'>
              <span><Icon name='bar graph'/>Analytics</span>
            </Menu.Item>
            <Menu.Item name='users'>
              <span><Icon name='users'/>Users</span>
            </Menu.Item>
            <Menu.Item name='assets'>
              <span><Icon name='tv'/>Assets</span>
            </Menu.Item>
            <Menu.Item name='reports'>
              <span><Icon name='tasks'/>Reports</span>
            </Menu.Item>
            <Menu.Item name='feedback'>
              <span><Icon name='address card'/>Feedback</span>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <NavBarComponent title={title} toggleVisibility={this.toggleVisibility}/>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SideMenuComponent;
