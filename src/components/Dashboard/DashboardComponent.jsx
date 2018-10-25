import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Header,
  Divider,
  Grid
} from 'semantic-ui-react';
import '../../_css/DashboardComponent.css';
import NavBarComponent from '../../_components/NavBarContainer';
import AnalyticsCardComponent from './AnalyticsCardComponent';

class DashboardComponent extends Component {
  state = {
    assetStateDamaged: true,
    assetStateLost: false,
    assetStateAllocated: false,
    assetStateAvailable: false
  };

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
                      assetNumber={90}
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
                      assetNumber={20}
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
                      assetNumber={200}
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
                      assetNumber={30}
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
export default withRouter(DashboardComponent);
