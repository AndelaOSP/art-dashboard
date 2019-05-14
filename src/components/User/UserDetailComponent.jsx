import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Header, Icon, Table, Segment, Card } from 'semantic-ui-react';
// import LoaderComponent from '../../components/LoaderComponent';
import TableRowDetail from '../TableRowComponent';
import EditableUserDetailsComponent from './EditableUserDetailsComponent';
import StatusMessageComponent from '../common/StatusComponent';

import verifySuperAdmin from '../../_utils/verifySuperAdmin';

import '../../_css/UserDetailComponent.css';

const assetsAssigned = (allocatedAssets) => {
  if (isEmpty(allocatedAssets)) {
    return (
      <Card>
        <Card.Content extra>No Assests Allocated</Card.Content>
      </Card>
    );
  }

  return (
    <Table basic selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset Type</Table.HeaderCell>
          <Table.HeaderCell>Asset Code</Table.HeaderCell>
          <Table.HeaderCell>Serial Number</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {allocatedAssets.map(asset => (
          <TableRowDetail
            key={asset.id}
            data={asset}
            viewDetailsRoute={`/assets/${asset.uuid}/view`}
            headings={['asset_type', 'asset_code', 'serial_number']}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const UserDetailComponent = (props) => {
  if (isEmpty(props.userDetail)) {
    return <div>User Not Found</div>;
  }

  return (
    <div>
      <Header as="h2" textAlign="left">
        {props.userDetail.full_name || 'Andelan'}
      </Header>
      {
        (props.successMessage !== '' || props.errorMessage !== '') && (
          <StatusMessageComponent
            message={props.successMessage || props.errorMessage}
            className={(props.successMessage !== '') ? 'success-status' : 'error-status'}
          />
        )
      }

      <Segment.Group horizontal>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="mail" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">{props.userDetail.email}</div>
        </Segment>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="group" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {props.userDetail.cohort || 'Not Provided'}
          </div>
        </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="slack" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {props.userDetail.slack_handle || 'Not Provided'}
          </div>
        </Segment>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="call" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {props.userDetail.phone_number || 'Not Provided'}
          </div>
        </Segment>
      </Segment.Group>
      {
        verifySuperAdmin() && (
          <Segment.Group horizontal>
            <Segment className="user-detail-info">
              <div className="user-detail-icon">
                <Icon name="user" size="large" style={{ width: '15%' }} />
              </div>
              <div className="user-detail-content">
                <EditableUserDetailsComponent
                  id={props.userDetail.id}
                  userDetail={props.userDetail}
                  updateUserDetail={props.updateUserDetail}
                  isLoading={props.isLoading}
                />
              </div>
            </Segment>
            <Segment className="user-detail-info" />
          </Segment.Group>
        )
      }
      <Header as="h3" textAlign="left">
        Total Assets Assigned: {props.userDetail.allocated_assets.length}
      </Header>
      {assetsAssigned(props.userDetail.allocated_assets)}
    </div>
  );
};

UserDetailComponent.propTypes = {
  isLoading: PropTypes.bool,
  userDetail: PropTypes.object,
  updateUserDetail: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

UserDetailComponent.defaultTypes = {
  isLoading: false,
  userDetail: {}
};

export default UserDetailComponent;
