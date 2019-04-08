import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { Link, NavLink } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Icon,
  Image,
  Transition
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../_css/NavBarComponent.css';

export class NavBarComponent extends Component {
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
      url: '/asset-logs',
      title: 'Logs',
      imgSrc: '/images/assets.png'
    },
    {
      url: '/allocations',
      title: 'Allocations',
      imgSrc: '/images/allocated.png'
    }
  ];

  state = {
    limit: 10,
    pageNumber: 1,
    value: { 'Serial Number': '' }
  };

  handleLogout = () => {
    localStorage.removeItem('art-prod-web-token');
    this.props.history.push('/');
  };

  navButton = () => {
    const { isVisible } = this.props;

    if (isVisible) {
      return <Icon id="hamburger" name="angle double up" />;
    }
    return <Icon id="hamburger" name="bars" />;
  };

  handleSearchInput = (event, data = {}) => {
    event.preventDefault();
    const searchValue = event.target.value || data.value;
    this.setState(prevState => ({ value: { ...prevState.value, 'Serial Number': searchValue } }));
  }

  handleSearch = (event) => {
    event.stopPropagation();
    const { location, history } = this.props;
    if (location.pathname.includes('/assets') && event.key === 'Enter') {
      const { pageNumber, limit, value } = this.state;
      this.props.getAssetsAction(pageNumber, limit, value);
      this.setState({ value: { 'Serial Number': '' } });
      history.push(`/assets/${value['Serial Number']}/search`);
    }
  }

  render() {
    const { isVisible, placeHolder } = this.props;
    const token = jwt.decode(localStorage.getItem('art-prod-web-token'));
    const { picture } = token || {};

    const topBarClass = isVisible ? 'top-bar-height-open' : 'top-bar-height-closed';

    const pageContentClass = isVisible ? 'page-content-margin-open' : 'page-content-margin-closed';

    return (
      <React.Fragment>
        <div className={`top-bar ${topBarClass}`}>
          <Menu id="nav-bar" secondary stackable>
            <Menu.Item id="toggle-menu" name="menu" onClick={this.props.toggleVisibilityAction}>
              {this.navButton()}
            </Menu.Item>

            <Menu.Item>
              <Link to="/dashboard">
                <Image id="banner" src="/images/andela_logo_blue_landscape.png" />
              </Link>
            </Menu.Item>

            <Menu.Menu id="search-menu">
              <Menu.Item>
                <Input
                  id="nav-search"
                  className="icon"
                  icon="search"
                  value={this.state.value['Serial Number']}
                  placeholder={placeHolder}
                  onKeyDown={this.handleSearch}
                  onChange={this.handleSearchInput}

                />
              </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position="right">
              <Menu.Item>
                <Link to="/assets/create">
                  <Button
                    className="add-asset"
                    size="small"
                  >
                    ADD ASSET
                  </Button>
                </Link>
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

          <Transition.Group animation="fade down" duration="700">
            {
              isVisible &&
              <div className="collapsible-menu">
                {
                  this.navigationLinks.map(nav => (
                    <NavLink key={nav.url} to={nav.url}>
                      <span>
                        <Image
                          className="nav-images"
                          src={nav.imgSrc}
                        />
                      </span>

                      <span className="nav-text">
                        {nav.title}
                      </span>
                    </NavLink>
                      ))
                }
              </div>
            }
          </Transition.Group>
        </div>

        <div className={`page-content ${pageContentClass}`}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

NavBarComponent.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  push: PropTypes.func,
  toggleVisibilityAction: PropTypes.func,
  isVisible: PropTypes.bool,
  placeHolder: PropTypes.string,
  getAssetsAction: PropTypes.func,
  location: PropTypes.object
};

NavBarComponent.defaultProps = {
  placeHolder: 'Search...'
};

export default NavBarComponent;
