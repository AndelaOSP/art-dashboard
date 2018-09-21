import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Header,
  Divider,
  Grid
} from 'semantic-ui-react';
import '../../_css/DashboardComponent.css';
import NavbarComponent from '../NavBarComponent';
import AnalyticsCardComponent from './AnalyticsCardComponent';

class DashboardComponent extends Component {
  state = {
    assetStateDamaged: true,
    assetStateLost: false,
    assetStateAllocated: false,
    assetStateAvailable: false
  };

  render() {
    return (
      <NavbarComponent>
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

          <div id="asset-links-section">
            <Grid columns={4} stackable>
              <Grid.Column>
                <Link to="/assets">Asset List</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-makes">Asset Makes</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-types">Asset Types</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-models">Asset Models</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-categories">Asset Categories</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-sub-categories">Asset Sub-Categories</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-conditions">Asset Conditions</Link>
              </Grid.Column>

              <Grid.Column>
                <Link to="/asset-specs">Asset Specs</Link>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </NavbarComponent>
    );
  }
}
export default withRouter(DashboardComponent);
