import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Divider,
  Grid
} from 'semantic-ui-react';
import '../_css/DashboardComponent.css';
import NavbarComponent from './NavBarComponent';
import AnalyticsCardComponent from './AnalyticsCardComponent';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';

class DashboardComponent extends Component {
  state = {
    assetStateDamaged: true,
    assetStateLost: false,
    assetStateAllocated: false,
    assetStateAvailable: false

  }

  render() {
    return (
      <NavbarComponent>
        <div id="dashboard-content">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left">Analytics</Header>
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
          <div id="art-charts">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <div id="area-chart">
                    <Chart1 />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Grid id="right-chart-grid">
                    <Grid.Row columns={2} style={{ border: 'solid 1px #707070', borderRadius: '10px' }}>
                      <Grid.Column>
                        <Chart2 />
                      </Grid.Column>
                      <Grid.Column>
                        <Chart3 />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </NavbarComponent>
    );
  }
}
export default withRouter(DashboardComponent);
