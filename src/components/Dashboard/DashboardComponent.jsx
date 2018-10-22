import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import {
  Header,
  Divider,
  Grid
} from 'semantic-ui-react';
import NavBarComponent from '../../_components/NavBarContainer';
import AnalyticsCardComponent from './AnalyticsCardComponent';
import {
  getAllocatedAssets,
  getAvailableAssets,
  getDamagedAssets,
  getLostAssets
} from '../../_actions/assetStatus.action';

import '../../_css/DashboardComponent.css';

class DashboardComponent extends Component {
  state = {
    assetStateDamaged: true,
    assetStateLost: false,
    assetStateAllocated: false,
    assetStateAvailable: false
  };

  componentDidMount() {
    const { lostAssets, availableAssets, damagedAssets, allocatedAssets } = this.props;

    if (isEmpty(lostAssets.assetsList)) {
      this.props.getLostAssets();
    }

    if (isEmpty(availableAssets.assetsList)) {
      this.props.getAvailableAssets();
    }

    if (isEmpty(damagedAssets.assetsList)) {
      this.props.getDamagedAssets();
    }

    if (isEmpty(allocatedAssets.assetsList)) {
      this.props.getAllocatedAssets();
    }
  }

  assetNavigation = [
    {
      url: '/asset-makes',
      title: 'Asset Makes'
    },
    {
      url: '/asset-types',
      title: 'Asset Types'
    },
    {
      url: '/asset-models',
      title: 'Asset Models'
    },
    {
      url: '/asset-categories',
      title: 'Asset Categories'
    },
    {
      url: '/asset-sub-categories',
      title: 'Asset Sub-Categories'
    },
    {
      url: '/asset-specs',
      title: 'Asset Specs'
    }
  ];

  render() {
    const { lostAssets, availableAssets, damagedAssets, allocatedAssets } = this.props;

    return (
      <NavBarComponent>
        <div id="dashboard-content">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left">Home</Header>
            <Divider id="art-divider" />
          </div>
          <div id="analytics-state-selection">
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <div className={`analytics-state-rectangle ${this.state.assetStateDamaged ? 'active-analytics' : ''}`}>
                    {
                        this.state.assetStateDamaged ?
                          <div id="circle">
                            <div className="checkmark" />
                          </div>
                          :
                          ''
                      }
                    <AnalyticsCardComponent
                      assetNumber={damagedAssets.assetsCount}
                      assetState="damaged"
                      image="/images/damaged.png"
                      cssClass="damaged"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className={`analytics-state-rectangle ${this.state.assetStateLost ? 'active-analytics' : ''}`}>
                    {
                        this.state.assetStateLost ?
                          <div id="circle">
                            <div className="checkmark" />
                          </div>
                          :
                          ''
                      }
                    <AnalyticsCardComponent
                      assetNumber={lostAssets.assetsCount}
                      assetState="lost"
                      image="/images/lost.png"
                      cssClass="lost"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className={`analytics-state-rectangle ${this.state.assetStateAllocated ? 'active-analytics' : ''}`}>
                    {
                        this.state.assetStateAllocated ?
                          <div id="circle">
                            <div className="checkmark" />
                          </div>
                          :
                          ''
                      }
                    <AnalyticsCardComponent
                      assetNumber={allocatedAssets.assetsCount}
                      assetState="allocated"
                      image="/images/allocated.png"
                      cssClass="allocated"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className={`analytics-state-rectangle ${this.state.assetStateAvailable ? 'active-analytics' : ''}`}>
                    {
                        this.state.assetStateAvailable ?
                          <div id="circle">
                            <div className="checkmark" />
                          </div>
                          :
                          ''
                      }
                    <AnalyticsCardComponent
                      assetNumber={availableAssets.assetsCount}
                      assetState="available"
                      image="/images/available.png"
                      cssClass="available"
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <Divider />

          <div className="asset-links-section">
            <Grid>
              {
                this.assetNavigation.map(nav => (
                  <Grid.Column key={nav.url}>
                    <Link to={nav.url}>{nav.title}</Link>
                  </Grid.Column>
                ))
              }
            </Grid>
          </div>
        </div>
      </NavBarComponent>
    );
  }
}

DashboardComponent.propTypes = {
  lostAssets: PropTypes.object,
  availableAssets: PropTypes.object,
  damagedAssets: PropTypes.object,
  allocatedAssets: PropTypes.object,
  getAllocatedAssets: PropTypes.func.isRequired,
  getAvailableAssets: PropTypes.func.isRequired,
  getDamagedAssets: PropTypes.func.isRequired,
  getLostAssets: PropTypes.func.isRequired
};

DashboardComponent.defaultProps = {
  lostAssets: {},
  availableAssets: {},
  damagedAssets: {},
  allocatedAssets: {}
};

const mapStateToProps = ({ assetStatus }) => {
  const {
    lostAssets,
    availableAssets,
    damagedAssets,
    allocatedAssets
  } = assetStatus;

  return {
    lostAssets,
    availableAssets,
    damagedAssets,
    allocatedAssets
  };
};

export default withRouter(connect(mapStateToProps, {
  getAllocatedAssets,
  getAvailableAssets,
  getDamagedAssets,
  getLostAssets
})(DashboardComponent));
