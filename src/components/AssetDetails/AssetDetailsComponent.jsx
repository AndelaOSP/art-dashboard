import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Divider, Grid, Header, Segment, Icon, Tab, Table } from 'semantic-ui-react';
import AssetAllocationHistory from '../AssetAllocationHistory';
import AssetDescriptionComponent from '../AssetDescriptionComponent';
import AssetNotes from '../AssetNoteComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../LoaderComponent';

import '../../_css/AssetDetailsComponent.css';

class AssetDetailsComponent extends Component {
  componentDidMount() {
    const { assetAsigneeUsers, match, shouldFetchDetails } = this.props;
    const { id } = match.params;

    if (shouldFetchDetails) {
      this.props.getAssetDetail(id);
    }

    if (isEmpty(assetAsigneeUsers)) {
      this.props.loadAssetAssigneeUsers();
    }
  }

  render() {
    if (this.props.assetLoading) {
      return (
        <NavBarComponent>
          <Container>
            <div id="page-heading-section">
              <Header as="h1" id="page-headings" floated="left" content="Asset Detail" />
              <Divider id="assets-divider" />
            </div>
            <LoaderComponent />
          </Container>
        </NavBarComponent>
      );
    }

    const { assetDetail, errorMessage } = this.props;
    const assetTabPanes = [
      {
        menuItem: 'Description',
        render: () => (
          <Tab.Pane attached={false} className="asset-tab-pane">
            <AssetDescriptionComponent
              {...this.props}
              assetDetail={assetDetail}
              assignedUser={assetDetail.assigned_to}
              errorMessage={errorMessage}
            />
          </Tab.Pane>)
      },
      {
        menuItem: 'Asset Note',
        render: () => (
          <Tab.Pane attached={false} className="asset-tab-pane current-condition">
            <AssetNotes assetNotes={assetDetail.notes} />
          </Tab.Pane>)
      },
      {
        menuItem: 'Asset Allocation History',
        render: () => (
          <Tab.Pane attached={false} className="asset-tab-pane allocation-history">
            <AssetAllocationHistory allocationHistory={assetDetail.allocation_history} />
          </Tab.Pane>)
      }
    ];

    return (
      <NavBarComponent>
        <Container>
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Detail" />
            <Divider id="assets-divider" />
          </div>
          <Segment raised className="asset-detail__segment">
            <div className="asset-details">
              <div className="edit-asset-detail">
                <Icon size="large" link name="pencil" />
              </div>
              <Grid columns={2} stackable divided>
                <Grid.Column>
                  <Grid columns={1}>
                    <Grid.Column>
                      <Table basic="very" className="asset-detail__table">
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="details-headings">Category</Table.Cell>
                            <Table.Cell>{assetDetail.asset_category}</Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="details-headings">Sub-category</Table.Cell>
                            <Table.Cell>{assetDetail.asset_sub_category}</Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="details-headings">Type</Table.Cell>
                            <Table.Cell>{assetDetail.asset_type}</Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="details-headings">Make</Table.Cell>
                            <Table.Cell>{assetDetail.make_label}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>

                <Grid.Column>
                  <Grid columns={1}>
                    <Grid.Column>
                      <Table basic="very" className="asset-detail__table">
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="details-headings">Asset Code</Table.Cell>
                            <Table.Cell>{assetDetail.asset_code || '-'}</Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="details-headings">Serial Number</Table.Cell>
                            <Table.Cell>{assetDetail.serial_number || '-'}</Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="details-headings">Model Number</Table.Cell>
                            <Table.Cell>{assetDetail.model_number || '-'}</Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell className="details-headings">Asset Status</Table.Cell>
                            <Table.Cell>{assetDetail.current_status || '-'}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>
            </div>
          </Segment>

          <Tab
            className="asset-tab"
            menu={{ secondary: true, pointing: true }}
            panes={assetTabPanes}
          />
        </Container>
      </NavBarComponent>
    );
  }
}

AssetDetailsComponent.propTypes = {
  assetDetail: PropTypes.object,
  assignedUser: PropTypes.object,
  errorMessage: PropTypes.string,
  assetLoading: PropTypes.bool,
  match: PropTypes.object,
  hasError: PropTypes.bool,
  shouldFetchDetails: PropTypes.bool,
  assetAsigneeUsers: PropTypes.array,
  getAssetDetail: PropTypes.func,
  loadAssetAssigneeUsers: PropTypes.func
};

AssetDetailsComponent.defaultProps = {
  assetLoading: false
};

export default AssetDetailsComponent;
