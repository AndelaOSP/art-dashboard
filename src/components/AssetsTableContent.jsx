import React from 'react';
import {
  Header,
  Table,
  Pagination,
  Segment
} from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PropTypes from 'prop-types';
import TableRowDetail from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import { ToastMessage } from '../_utils/ToastMessage';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';

const AssetsTableContent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent />;
  }

  if (props.hasError && props.errorMessage) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  if (props.emptyAssetsCheck()) {
    return (
      <Header as="h3" id="empty-assets" content="No Assets Found" />
    );
  }

  return (
    <div>
      <Table basic selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Asset Code
            </Table.HeaderCell>
            <Table.HeaderCell>
              Serial Number
            </Table.HeaderCell>
            <Table.HeaderCell>
              Model Number
            </Table.HeaderCell>
            <Table.HeaderCell>
              Asset Make
            </Table.HeaderCell>
            <Table.HeaderCell>
              Asset Type
            </Table.HeaderCell>
            <Table.HeaderCell>
              Category
            </Table.HeaderCell>
            <Table.HeaderCell>
              Sub-category
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.activePageAssets.map((asset) => {
              const assetViewUrl = `assets/${asset.uuid}/view`;

              const updatedAsset = {
                ...asset,
                asset_code: asset.asset_code || '-',
                serial_number: asset.serial_number || '-',
                model_number: asset.model_number || '-'
              };

              return (
                <TableRowDetail
                  viewDetailsRoute={assetViewUrl}
                  key={asset.id}
                  data={updatedAsset}
                  headings={[
                    'asset_code',
                    'serial_number',
                    'model_number',
                    'make_label',
                    'asset_type',
                    'asset_category',
                    'asset_sub_category'
                  ]}
                />
              );
            })
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            {!props.emptyAssetsCheck() ? (
              <Table.HeaderCell colSpan="8" id="pagination-header">
                <Segment.Group horizontal id="art-pagination-section">
                  <Segment>
                    <Pagination
                      id="art-pagination-component"
                      totalPages={props.handlePageTotal()}
                      onPageChange={props.handlePaginationChange}
                      activePage={props.activePage}
                    />
                  </Segment>
                  <Segment>
                    <DropdownComponent
                      customClass="page-limit"
                      placeHolder="Show Rows"
                      options={rowOptions}
                      upward
                      value={props.limit}
                      onChange={props.handleRowChange}
                    />
                  </Segment>
                </Segment.Group>
              </Table.HeaderCell>
            ) : ''}
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
  handleRowChange: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  limit: PropTypes.number
};

AssetsTableContent.defaultProps = {
  errorMessage: '',
  isLoading: false
};
export default AssetsTableContent;
