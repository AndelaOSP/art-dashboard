import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Grid,
  Input,
  Menu,
  Icon,
  Image,
  Sidebar
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ArtModal from './common/ModalComponent';

import '../_css/NavBarComponent.css';
import AddAssetContainer from '../_components/Assets/AddAssetContainer';
import ImportAssetComponent from './Assets/ImportAssetComponent';

export class NavBarComponent extends Component {
  state = {
    visible: true
  };

  navigationLinks = [
    {
      url: '/dashboard',
      title: 'Home',
      imgSrc: '/images/analytics.png'
    },
    {
      url: '/assets',
      title: 'Assets',
      imgSrc: '/images/assets.png'
    },
    {
      url: '/users',
      title: 'Users',
      imgSrc: '/images/users.png'
    },
    {
      url: '/incidence-reports',
      title: 'Incident Reports',
      imgSrc: '/images/reports.png'
    },
    {
      url: '/user-feedback',
      title: 'Feedback',
      imgSrc: '/images/feedback.png'
    },
    {
      url: '/allocations',
      title: 'Allocations',
      imgSrc: '/images/allocated.png'
    }
  ];

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  navButton = () => {
    const { visible } = this.state;

    if (visible) {
      return <Icon id="hamburger" name="angle double up" />;
    }
    return <Icon id="hamburger" name="bars" />;
  };

  render() {
    const { visible } = this.state;
    const token = jwt.decode(localStorage.getItem('art-prod-web-token'));
    const { picture } = token || {};

    return (
      <React.Fragment>
        <Menu id="nav-bar" secondary stackable>
          <Menu.Item id="toggle-menu" name="menu" onClick={this.toggleVisibility}>
            {this.navButton()}
          </Menu.Item>

          <Menu.Item>
            <Link to="/dashboard">
              <Image id="banner" src="/images/andela_logo_blue_landscape.png" />
            </Link>
          </Menu.Item>

          <Menu.Menu id="search-menu">
            <Menu.Item>
              <Input id="nav-search" className="icon" icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item>
              <ArtModal
                trigger={
                  <Button
                    className="add-asset"
                    size="small"
                  >
                    ADD ASSET
                  </Button>
                }
                modalTitle="Add Asset"
              >
                <AddAssetContainer />
              </ArtModal>
            </Menu.Item>

            <Menu.Item>
              <ArtModal
                trigger={
                  <Button
                    className="add-asset"
                    size="small"
                  >
                    IMPORT ASSET
                  </Button>
                }
                modalTitle="Import Asset"
              >
                <ImportAssetComponent />
              </ArtModal>
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
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>

        <Sidebar.Pushable id="nav-bar2">
          <Sidebar
            animation="push"
            direction="top"
            visible={visible}
          >
            <Grid textAlign="center">
              <Grid columns={6} className="navigation-bar">
                {
                  this.navigationLinks.map(nav => (
                    <Grid.Column key={nav.url} mobile={8} tablet={3} computer={2}>
                      <Link to={nav.url}>
                        <span>
                          <Image
                            className="nav-images"
                            src={nav.imgSrc}
                          />
                        </span>

                        {nav.title}
                      </Link>
                    </Grid.Column>
                  ))
                }
              </Grid>
            </Grid>
          </Sidebar>

          <Sidebar.Pusher>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

NavBarComponent.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  push: PropTypes.func
};

NavBarComponent.defaultProps = {
  push: () => {
  }
};

export default withRouter(NavBarComponent);
