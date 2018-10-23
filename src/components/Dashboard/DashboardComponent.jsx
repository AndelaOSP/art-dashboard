import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Header,
  Divider,
  Grid
} from 'semantic-ui-react';
import NavBarComponent from '../../_components/NavBarContainer';
import AssetStatusComponent from './AssetStatusComponent';

import '../../_css/DashboardComponent.css';

class DashboardComponent extends Component {
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
    const {
      allocatedAssets,
      availableAssets,
      damagedAssets,
      lostAssets,
      getAssetStatus
    } = this.props;

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
                <AssetStatusComponent
                  asset={damagedAssets}
                  status="damaged"
                  onFetchAssets={getAssetStatus}
                />
                <AssetStatusComponent
                  asset={lostAssets}
                  status="lost"
                  onFetchAssets={getAssetStatus}
                />
                <AssetStatusComponent
                  asset={allocatedAssets}
                  status="allocated"
                  onFetchAssets={getAssetStatus}
                />
                <AssetStatusComponent
                  asset={availableAssets}
                  status="available"
                  onFetchAssets={getAssetStatus}
                />
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
  getAssetStatus: PropTypes.func.isRequired
};

DashboardComponent.defaultProps = {
  lostAssets: {},
  availableAssets: {},
  damagedAssets: {},
  allocatedAssets: {}
};

export default DashboardComponent;
