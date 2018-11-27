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

import generateDropdownOptions from '../../_utils/generateDropdownOptions';

import '../../_css/AssetDetailsComponent.css';

class AssetDetailsComponent extends Component {
  state = {
    locationForm: false,
    asset_location: this.props.assetDetail.asset_location
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
      asset_location: data.value
    });
  };

  showLocationForm = () => {
    this.setState({
      locationForm: true
    });
  };

  saveLocation = () => {
    this.setState({
      locationForm: false
    });
  };

  render() {
    const { assetDetail, centreLoading, errorMessage } = this.props;

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
      const { asset_location, locationForm } = this.state;

      if (!locationForm) {
        return (
          <Table.Cell>
            {asset_location}
            <Icon
              name="edit"
              className="asset-detail__table__icon"
              onClick={this.showLocationForm}
            />
          </Table.Cell>
        );
      }

      return (
        <Table.Cell>
          <Form>
            {
              centreLoading
                ? { asset_location }
                : <DropdownComponent
                  customClass="form-dropdown asset-detail__table__dropdown"
                  label="Location"
                  options={generateDropdownOptions(generateCentreArray())}
                  placeholder="Select Asset Location"
                  name="asset_location"
                  value={asset_location}
                  onChange={this.onChange}
                  upward={false}
                />
            }
            <Icon name="save" className="asset-detail__table__icon" onClick={this.saveLocation} />
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
  assetDetail: PropTypes.object,
  assignedUser: PropTypes.object,
  errorMessage: PropTypes.string,
  assetLoading: PropTypes.bool,
  match: PropTypes.object,
  hasError: PropTypes.bool,
  shouldFetchDetails: PropTypes.bool,
  assetAsigneeUsers: PropTypes.array,
  getAssetDetail: PropTypes.func,
  loadAssetAssigneeUsers: PropTypes.func,
  shouldAddToStore: PropTypes.bool,
  addAsset: PropTypes.func,
  centreList: PropTypes.array,
  loadCentres: PropTypes.func,
  centreLoading: PropTypes.bool,
};

AssetDetailsComponent.defaultProps = {
  assetLoading: false
};

export default AssetDetailsComponent;
