import React, { Component } from 'react';
import { Accordion, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBarComponent from './NavBarComponent'; //eslint-disable-line

import '../_css/SideMenuComponent.css';

/* eslint-disable no-undef */
class SideMenuComponent extends Component {
  state = {
    visible: true,
    activeIndex: null
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSize);
    this.handleWindowSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSize);
  }

  handleWindowSize = () => {
    if (window.innerWidth < 960) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { visible, activeIndex } = this.state;
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
                src="https://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png" // eslint-disable-line max-len
                alt="Andela logo"
                id="andela-logo"
              />
            </Menu.Item>
            <Menu.Item name="analytics">
              <span><Icon name="bar graph" />Analytics</span>
            </Menu.Item>
            <Menu.Item name="users">
              <Link to="/users"><Icon name="users" />Users</Link>
            </Menu.Item>
            <Menu.Item>
              <Accordion>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleAccordionClick}
                  >
                    <Icon name="tv" />
                    Assets
                    <Icon name="dropdown" position="right" />
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0} className="no-border">
                    <Link to="/assets"><Icon name="list ul" />Assets</Link>
                  </Accordion.Content>
                  <Accordion.Content active={activeIndex === 0}>
                    <Link to="/asset_types"><Icon name="list ul" />Asset Types</Link>
                  </Accordion.Content>
                  <Accordion.Content active={activeIndex === 0}>
                    <Link to="/asset_models"><Icon name="list ul" />Asset Models</Link>
                  </Accordion.Content>
                  <Accordion.Content active={activeIndex === 0}>
                    <Link to="/asset-categories"><Icon name="list ul" />Asset Categories</Link>
                  </Accordion.Content>
                  <Accordion.Content active={activeIndex === 0}>
                    <Link to="/asset-makes"><Icon name="list ul" />Asset Makes</Link>
                  </Accordion.Content>
                  <Accordion.Content active={activeIndex === 0}>
                    <Link to="/asset-sub-categories"><Icon name="list ul" />Sub Categories</Link>
                  </Accordion.Content>
                  <Accordion.Content active={activeIndex === 0}>
                    <Link to="/asset-conditions"><Icon name="list ul" />Asset Conditions</Link>
                  </Accordion.Content>
                </Menu.Item>
              </Accordion>
            </Menu.Item>
            <Menu.Item name="reports">
              <Link to="/incidence-reports"><Icon name="tasks" />Reports</Link>
            </Menu.Item>
            <Menu.Item name="user-feedback">
              <Link to="/user-feedback"><Icon name="address card" /> User Feedback</Link>
            </Menu.Item>
            <Menu.Item name="allocations">
              <Link to="/allocations"><Icon name="table" />Allocations</Link>
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
  title: PropTypes.string
};

SideMenuComponent.defaultProps = {
  title: ''
};

export default SideMenuComponent;
