import React from 'react';
import { Button, Icon, Header, Table, Pagination } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PropTypes from 'prop-types';
import TableRowComponent from './TableRowComponent';
import ActionComponent from './ActionComponent';
import LoaderComponent from './LoaderComponent';
import { ToastMessage } from '../_utils/ToastMessage';

const AssetsTableContent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />;
  }

  if (props.hasError) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  if (props.emptyAssetsCheck()) {
    return (
      <Header as="h3" id="empty-assets" content="There are no assets assigned to you" />
    );
  }

  return (
    <div>
      <Button icon labelPosition="left" floated="right" className="add-asset">
        <Icon name="add" />
        Add Asset
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Asset Code</Table.HeaderCell>
            <Table.HeaderCell>Serial Number</Table.HeaderCell>
            <Table.HeaderCell>Model Number</Table.HeaderCell>
            <Table.HeaderCell>Checkin Status</Table.HeaderCell>
            <Table.HeaderCell>Current Status</Table.HeaderCell>
            <Table.HeaderCell>Asset Type</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.activePageAssets.map(asset => (
              <TableRowComponent
                key={asset.id}
                data={asset}
                headings={[
                  'asset_code',
                  'serial_number',
                  'model_number',
                  'checkin_status',
                  'current_status',
                  'asset_type',
                ]}
              >
                <Table.Cell>
                  <ActionComponent />
                </Table.Cell>
              </TableRowComponent>
            ))
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              {!props.emptyAssetsCheck() && (
                <Pagination
                  totalPages={props.handlePageTotal()}
                  onPageChange={props.handlePaginationChange}
                  activePage={props.activePage}
                />
              )}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>);
};

AssetsTableContent.propTypes = {
  activePage: PropTypes.number,
  activePageAssets: PropTypes.arrayOf(PropTypes.object),
  emptyAssetsCheck: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handlePageTotal: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

AssetsTableContent.defaultProps = {
  activePage: 1,
  errorMessage: '',
};
export default AssetsTableContent;
