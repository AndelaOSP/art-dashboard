import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  Container, Divider, Form, Grid, Header, Segment, Icon, Tab, Table
} from 'semantic-ui-react';

import AssetAllocationHistory from '../AssetAllocationHistory';
import AssetDescriptionComponent from '../AssetDescriptionComponent';
import AssetNotes from '../AssetNoteComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../LoaderComponent';
import DropdownComponent from '../common/DropdownComponent';
import StatusMessageComponent from '../common/StatusComponent';

import generateDropdownOptions from '../../_utils/generateDropdownOptions';
import verifySuperAdmin from '../../_utils/verifySuperAdmin';

import '../../_css/AssetDetailsComponent.css';

class AssetDetailsComponent extends Component {
  state = {
    locationForm: false,
    assetLocation: this.props.assetDetail.asset_location
  };

  componentDidMount() {
    const {
      assetAsigneeUsers,
      assetDetail,
      match,
      shouldAddToStore,
      shouldFetchDetails,
      getAssetDetail,
      addAsset,
      loadAssetAssigneeUsers,
      centreList,
      loadCentres
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

    if (isEmpty(centreList)) {
      loadCentres();
    }
  }

  onChange = (event, data) => {
    event.stopPropagation();

    this.setState({
      ...this.state,
      assetLocation: data.value
    });
  };

  toggleLocationForm = () => {
    this.setState({
      locationForm: !this.state.locationForm
    });
  };

  updateLocation = () => {
    const { assetDetail, match, updateAsset } = this.props;
    const { id } = match.params;
    const { assetLocation } = this.state;
    const { asset_code, model_number, serial_number } = assetDetail;

    const updateData = {
      asset_location: assetLocation,
      model_number,
      asset_code,
      serial_number
    };

    updateAsset(id, updateData).then(() => {
      this.toggleLocationForm();
    });
  };

  render() {
    const { assetDetail, centreLoading, errorMessage, success } = this.props;

    const showMessage = success || errorMessage;

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

    const generateCentreArray = () => {
      const { centreList } = this.props;
      const centreArray = [];

      centreList.map(opt => (
        centreArray.push(opt.centre_name)
      ));

      return centreArray;
    };

    const locationDisplay = () => {
      const { updateLoading } = this.props;
      const { assetLocation, locationForm } = this.state;

      if (!locationForm) {
        return (
          <Table.Cell>
            {assetLocation}

            {
              verifySuperAdmin() &&
              <Icon
                name="edit"
                className="asset-detail__table__icon"
                onClick={this.toggleLocationForm}
              />
            }
          </Table.Cell>
        );
      }

      return (
        <Table.Cell>
          <Form loading={updateLoading}>
            {
              centreLoading
                ? { assetLocation }
                : <DropdownComponent
                  customClass="form-dropdown asset-detail__table__dropdown"
                  label="Location"
                  options={generateDropdownOptions(generateCentreArray())}
                  placeholder="Select Asset Location"
                  name="assetLocation"
                  value={assetLocation}
                  onChange={this.onChange}
                  upward={false}
                />
            }

            <Icon
              name="close"
              className="asset-detail__table__icon"
              onClick={this.toggleLocationForm}
            />

            <Icon
              name="save"
              className="asset-detail__table__icon"
              onClick={this.updateLocation}
            />
          </Form>
        </Table.Cell>
      );
    };

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
                message={success || errorMessage}
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

                          <Table.Row>
                            <Table.Cell className="details-headings">Location</Table.Cell>
                            {locationDisplay()}
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
  assetAsigneeUsers: PropTypes.array,
  centreList: PropTypes.array,
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
  success: PropTypes.string
};

AssetDetailsComponent.defaultProps = {
  assetLoading: false
};

export default AssetDetailsComponent;
