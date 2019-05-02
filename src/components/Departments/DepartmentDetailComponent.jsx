import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Header, Table, Card, Divider } from 'semantic-ui-react';
import LoaderComponent from '../../components/LoaderComponent';
import TableRowDetail from '../TableRowComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import '../../_css/UserDetailComponent.css';


export class DepartmentDetailComponent extends React.Component {
  componentDidMount() {
    const { match, loadDepartmentDetail, departmentDetail } = this.props;
    if (isEmpty(departmentDetail)) loadDepartmentDetail(+match.params.id);
  }

  assetsAssigned = (assets) => {
    if (isEmpty(assets)) {
      return (
        <Card>
          <Card.Content extra>
            No Assigned Assets
          </Card.Content>
        </Card>
      );
    }

    return (
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
              Asset Category
            </Table.HeaderCell>
            <Table.HeaderCell>
              Serial Number
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            assets.map(asset => (
              <TableRowDetail
                key={asset.uuid}
                data={asset}
                viewDetailsRoute={`/assets/${asset.uuid}/view`}
                headings={[
                  'asset_type',
                  'asset_code',
                  'asset_category',
                  'serial_number'
                ]}
              />
            ))
          }
        </Table.Body>
      </Table>
    );
  };

  render() {
    const { isLoading, departmentDetail } = this.props;
    if (isLoading) {
      return (
        <LoaderComponent />
      );
    }

    if (isEmpty(departmentDetail)) {
      return (
        <div>
          Department Not Found
        </div>
      );
    }
    return (
      <NavBarComponent title="Department">
        <div className="users-list">
          <div id="page-heading-section">
            <Header
              as="h1"
              id="page-headings"
              floated="left"
              content="Department-detail"
            />
            <Divider id="assets-divider" />
          </div>
          <div>
            <Header as="h3" textAlign="left">
              Department Name: {departmentDetail.name || 'Not Provided'}
            </Header>
            <Header as="h3" textAlign="left">
          Total Assets Assigned: {departmentDetail.assets_assigned.length}
            </Header>
            {this.assetsAssigned(departmentDetail.assets_assigned)}
          </div>
        </div>
      </NavBarComponent>
    );
  }
}

DepartmentDetailComponent.propTypes = {
  isLoading: PropTypes.bool,
  departmentDetail: PropTypes.object,
  loadDepartmentDetail: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default DepartmentDetailComponent;
