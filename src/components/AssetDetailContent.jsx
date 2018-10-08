import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Icon, Tab, Table } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import AssetAllocationHistory from './AssetAllocationHistory';
import AssetDescriptionComponent from './AssetDescriptionComponent';
import AssetNotes from './AssetNoteComponent';
import { ToastMessage } from '../_utils/ToastMessage';
import LoaderComponent from './LoaderComponent';

import '../_css/AssetDetailContent.css';

const AssetDetailContent = (props) => {
  if (Object.values(props.isLoading).find(loading => loading)) {
    return (
      <LoaderComponent />
    );
  }

  if (props.hasError) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  const { assetDetail, assignedUser } = props;
  const assetTabPanes = [
    {
      menuItem: 'Description',
      render: () => (
        <Tab.Pane attached={false} className="asset-tab-pane">
          <AssetDescriptionComponent
            {...props}
            assetDetail={assetDetail}
            assignedUser={assignedUser}
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
    <div>
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
    </div>
  );
};

AssetDetailContent.propTypes = {
  assetDetail: PropTypes.object,
  assignedUser: PropTypes.object,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.object
};

export default AssetDetailContent;
