import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Icon, Tab } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import '../_css/AssetDetailContent.css';
import AssetAllocationHistory from './AssetAllocationHistory';
import AssetDescriptionComponent from './AssetDescriptionComponent';
import { ToastMessage } from '../_utils/ToastMessage';
import LoaderComponent from './LoaderComponent';

const AssetDetailContent = (props) => {
  if (props.isLoading) {
    return (
      <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />
    );
  }

  if (props.hasError) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  const { assetDetail, assignedUser, assignedAsset } = props;
  const assetTabPanes = [
    {
      menuItem: 'Description',
      render: () => (
        <Tab.Pane attached={false} className="asset-tab-pane">
          <AssetDescriptionComponent
            {...props}
            assignedAsset={assignedAsset}
            assetDetail={assetDetail}
            assignedUser={assignedUser}
          />
        </Tab.Pane>)
    },
    {
      menuItem: 'Current Condition',
      render: () => (
        <Tab.Pane attached={false} className="asset-tab-pane current-condition">
          Current condition is not available for this asset
        </Tab.Pane>)
    },
    {
      menuItem: 'Asset History',
      render: () => (
        <Tab.Pane attached={false} className="asset-tab-pane">
          <AssetAllocationHistory allocationHistory={assetDetail.allocation_history} />
        </Tab.Pane>)
    }
  ];

  return (
    <div>
      <Segment raised>
        <div className="asset-details">
          <div className="edit-asset-detail">
            <Icon size="large" link name="pencil" />
          </div>
          <Grid columns={2} stackable divided>
            <Grid.Column>
              <Grid columns={2}>
                <Grid.Column className="details-headings">
                  <div><p>Category</p></div>
                  <div><p>Sub-category</p></div>
                  <div><p>Type</p></div>
                  <div><p>Make</p></div>
                </Grid.Column>
                <Grid.Column className="details-description">
                  <div><p>Electronics</p></div>
                  <div><p>Computer</p></div>
                  <div><p> {assetDetail.asset_type}</p></div>
                  <div><p>Microsoft</p></div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid columns={2}>
                <Grid.Column className="details-headings">
                  <div><p>Asset Code</p></div>
                  <div><p>Serial Number</p></div>
                  <div><p>Model Number</p></div>
                  <div><p>Asset Status</p></div>
                </Grid.Column>
                <Grid.Column className="details-description">
                  <div><p>{assetDetail.asset_code}</p></div>
                  <div><p>{assetDetail.serial_number}</p></div>
                  <div><p>{assetDetail.model_number}</p></div>
                  <div><p>{assetDetail.current_status}</p></div>
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
  assignedAsset: PropTypes.object,
  assetDetail: PropTypes.object,
  assignedUser: PropTypes.object,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default AssetDetailContent;
