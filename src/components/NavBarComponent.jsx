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
  Popup,
  Sidebar
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ArtModal from './common/ModalComponent';

import '../_css/NavBarComponent.css';
import AddAssetContainer from '../_components/Assets/AddAssetContainer';

export class NavBarComponent extends Component {
  state = {
    visible: false
  };

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    const token = jwt.decode(localStorage.getItem('art-prod-web-token'));
    const { picture } = token || {};

    return (
      <div>
        <Menu id="nav-bar" secondary stackable>
          <Menu.Item id="toggle-menu" name="menu" onClick={this.toggleVisibility}>
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
              <ArtModal
                trigger={
                  <Button
                    id="blue-rounded-button"
                    size="small"
                  >
                    + ADD ASSET
                  </Button>
                }
                modalTitle="Add Asset"
              >
                <AddAssetContainer />
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
                >Logout
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
              <Grid columns={6}>
                <Grid.Column>
                  <Link to="/dashboard"><span><Image className="nav-images" src="/images/analytics.png" /></span>Analytics</Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to="/users"><span><Image className="nav-images" src="/images/users.png" /></span>Users</Link>
                </Grid.Column>

                <Grid.Column>
                  <Popup
                    id="assets-popup"
                    wide
                    trigger={<span><Image className="nav-images" src="/images/assets.png" />Assets</span>}
                    on="click"
                    position="bottom center"
                  >
                    <Grid columns={2}>
                      <Grid.Column>
                        <Link to="/assets"><Icon name="list ul" />Asset List</Link>
                      </Grid.Column>

                      <Grid.Column>
                        <Link to="/asset_types"><Icon name="list ul" />Asset Types</Link>
                      </Grid.Column>

                      <Grid.Column>
                        <Link to="/asset_models"><Icon name="list ul" />Asset Models</Link>
                      </Grid.Column>

                      <Grid.Column>
                        <Link to="/asset-categories"><Icon name="list ul" />Asset Categories</Link>
                      </Grid.Column>

                      <Grid.Column>
                        <Link to="/asset-sub-categories"><Icon name="list ul" />Asset Sub-Categories</Link>
                      </Grid.Column>

                      <Grid.Column>
                        <Link to="/asset-conditions"><Icon name="list ul" />Asset Conditions</Link>
                      </Grid.Column>
                      <Grid.Column>
                        <Link to="/asset-specs"><Icon name="list ul" />Asset Specs</Link>
                      </Grid.Column>
                    </Grid>
                  </Popup>
                </Grid.Column>

                <Grid.Column>
                  <Link to="/incidence-reports"><span><Image className="nav-images" src="/images/reports.png" /></span>Reports</Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to="/user-feedback"><span><Image className="nav-images" src="/images/feedback.png" /></span>Feedback</Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to="/allocations"><span><Image className="nav-images" src="/images/allocated.png" /></span>Allocations</Link>
                </Grid.Column>
              </Grid>
            </Grid>
          </Sidebar>

          <Sidebar.Pusher>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
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
