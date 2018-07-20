import React from 'react';
import {
  Header,
  Table,
  Pagination
} from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PropTypes from 'prop-types';
import TableRowComponent from './TableRowComponent';
import ModalComponent from './common/ModalComponent';
import ActionComponent from './ActionComponent';
import LoaderComponent from './LoaderComponent';
import ModelNumberContainer from '../_components/ModelNumber/ModelNumberContainer';
import AssetTypesContainer from '../_components/AssetTypes/AddAssetTypesContainer';
import CategoryContainer from '../_components/Category/CategoryContainer';
import AssetMakeContainer from '../_components/AssetMake/AssetMakeContainer';
import { ToastMessage } from '../_utils/ToastMessage';
import AddSubCategoryContainer from '../_components/SubCategory/AddSubCategoriesContainer';

const AssetsTableContent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />;
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
      <Table basic id="art-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Asset Code</span>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Serial Number</span>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Model Number</span>
              <ModalComponent modalTitle="Add Asset Model Number">
                <ModelNumberContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Asset Make</span>
              <ModalComponent modalTitle="Add Asset Make">
                <AssetMakeContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Asset Type</span>
              <ModalComponent modalTitle="Add Asset Type">
                <AssetTypesContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Sub-category</span>
              <ModalComponent modalTitle="Add Sub-Category">
                <AddSubCategoryContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Category</span>
              <ModalComponent modalTitle="Add Asset Category">
                <CategoryContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell id="table-headers">
              <span className="assets-heading">Action</span>
            </Table.HeaderCell>
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
                    'make_label',
                    'asset_type',
                    'asset_category',
                    'asset_sub_category'
                  ]}
              >
                <Table.Cell id="table-body-rows">
                  <ActionComponent
                    onViewClick={() => {
                        props.handleViewAsset(asset.serial_number);
                      }}
                  />
                </Table.Cell>
              </TableRowComponent>
              ))
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8" id="table-footers">
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
  isLoading: PropTypes.bool.isRequired
};

AssetsTableContent.defaultProps = {
  activePage: 1,
  errorMessage: ''
};
export default AssetsTableContent;
