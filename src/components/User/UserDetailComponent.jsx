import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Header, Icon, Table, Segment } from 'semantic-ui-react';
import LoaderComponent from '../../components/LoaderComponent';
import TableRowDetail from '../TableRowComponent';

import '../../_css/UserDetailComponent.css';

const UserDetailComponent = (props) => {
  if (props.isLoading) {
    return (
      <LoaderComponent />
    );
  }

  if (isEmpty(props.userDetail)) {
    return (
      <div>
        User Not Found
      </div>
    );
  }

  const fakeAssetTable = [
    {
      id: 45,
      asset_type: 'Computer',
      asset_code: 'AND/RE/34',
      serial_number: 'GT2342342'
    },
    {
      id: 56,
      asset_type: 'Dongle',
      asset_code: 'AND/DNG/43',
      serial_number: 'DNG90909903'
    }
  ];
  return (
    <div>
      <Header as="h2" textAlign="left">
        {
          props.userDetail.full_name !== ' ' ?
          props.userDetail.full_name : 'Andelan'
        }
      </Header>
      <Segment.Group horizontal>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="mail" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {props.userDetail.email}
          </div>
        </Segment>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="group" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {
              props.userDetail.cohort !== null ?
                props.userDetail.cohort : 'Not Provided'
            }
          </div>
        </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="slack" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {
              props.userDetail.slack_handle !== null ?
                props.userDetail.slack_handle : 'Not Provided'
            }
          </div>
        </Segment>
        <Segment className="user-detail-info">
          <div className="user-detail-icon">
            <Icon name="call" size="large" style={{ width: '15%' }} />
          </div>
          <div className="user-detail-content">
            {
              props.userDetail.phone_number !== null ?
                props.userDetail.phone_number : 'Not Provided'
            }
          </div>
        </Segment>
      </Segment.Group>
      <Header as="h3" textAlign="left">Total Assets Assigned 2</Header>
      <Table basic selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Asset Type
            </Table.HeaderCell>
            <Table.HeaderCell>
              Asset Code
            </Table.HeaderCell>
            <Table.HeaderCell>
              Serial Number
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            fakeAssetTable.map(asset => (
              <TableRowDetail
                key={asset.id}
                data={asset}
                headings={[
                    'asset_type',
                    'asset_code',
                    'serial_number'
                  ]}
              />
              ))
          }
        </Table.Body>
      </Table>
    </div>
  );
};

UserDetailComponent.propTypes = {
  isLoading: PropTypes.bool,
  userDetail: PropTypes.object
};

UserDetailComponent.defaultTypes = {
  isLoading: false,
  userDetail: {}
};


export default UserDetailComponent;
