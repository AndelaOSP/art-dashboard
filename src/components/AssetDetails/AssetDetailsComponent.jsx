import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  Container,
  Divider,
  Grid,
  Header,
  Segment,
  Tab,
  Table
} from 'semantic-ui-react';

import AssetAllocationHistory from '../AssetAllocationHistory';
import AssetDescriptionComponent from '../AssetDescriptionComponent';
import AssetNotes from '../AssetNoteComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../LoaderComponent';
import StatusMessageComponent from '../common/StatusComponent';
import OfficeLocations from '../../_components/OfficeLocations/OfficeLocationsContainer';
import AssetVerifiedComponent from './AssetVerifiedComponent';

import '../../_css/AssetDetailsComponent.css';

class AssetDetailsComponent extends Component {
  componentDidMount() {
    const {
      assetAsigneeUsers,
      assetDetail,
      match,
      shouldAddToStore,
      shouldFetchDetails,
      getAssetDetail,
      addAsset,
      loadAssetAssigneeUsers
    } = this.props;

    const { id } = match.params;

    if (shouldFetchDetails) {
      getAssetDetail(id);
    }

    if (shouldAddToStore) {
      addAsset(assetDetail);
    }

    if (isEmpty(assetAsigneeUsers)) {
      loadAssetAssigneeUsers();
    }
  }

  render() {
    const {
      assetDetail,
      errorMessage,
      success,
      updateErrorMessage,
      match,
      updateAsset
    } = this.props;

    const showMessage = success || updateErrorMessage;

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

          {
            showMessage && (
              <StatusMessageComponent
                message={success || updateErrorMessage}
                className={success ? 'success-status' : 'error-status'}
                reset={this.props.resetMessage}
              />
            )
          }

          <Segment raised className="asset-detail__segment">
            <div className="asset-details">
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

                          <OfficeLocations uuid={match.params.id} />
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

                          <AssetVerifiedComponent
                            uuid={match.params.id}
                            assetDetail={assetDetail}
                            updateAsset={updateAsset}
                          />
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
  assetAsigneeUsers: PropTypes.array,
  assetLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  centreLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  shouldAddToStore: PropTypes.bool,
  shouldFetchDetails: PropTypes.bool,
  getAssetDetail: PropTypes.func,
  loadAssetAssigneeUsers: PropTypes.func,
  addAsset: PropTypes.func,
  loadCentres: PropTypes.func,
  updateAsset: PropTypes.func,
  resetMessage: PropTypes.func,
  assetDetail: PropTypes.object,
  assignedUser: PropTypes.object,
  match: PropTypes.object,
  errorMessage: PropTypes.string,
  success: PropTypes.string,
  updateErrorMessage: PropTypes.string
};

AssetDetailsComponent.defaultProps = {
  assetLoading: false
};

export default AssetDetailsComponent;
