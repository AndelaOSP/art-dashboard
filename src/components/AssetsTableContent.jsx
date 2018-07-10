import React from 'react';
import { Button, Header, Table, Pagination } from 'semantic-ui-react';
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
import AddAssetComponent from '../_components/AddAsset/AddAssetContainer';

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
      <Header as="h3" id="empty-assets" content="No Assets Found" />
    );
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <div className="assets-header">
                Category
                <ModalComponent modalTitle="Add Asset Category">
                  <CategoryContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Sub-category
                <ModalComponent modalTitle="Add Sub-Category">
                  <AddSubCategoryContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Asset Code
                <ModalComponent />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Serial Number
                <ModalComponent />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Asset Make
                <ModalComponent modalTitle="Add Asset Make">
                  <AssetMakeContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Model Number
                <ModalComponent modalTitle="Add Asset Model Number">
                  <ModelNumberContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Asset Type
                <ModalComponent modalTitle="Add Asset Type">
                  <AssetTypesContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.activePageAssets.map((asset) => {
              asset.category = 'Electronics';
              asset.sub_category = 'Computers';
              return (
                <TableRowComponent
                  key={asset.id}
                  data={asset}
                  headings={[
                    'category',
                    'sub_category',
                    'asset_code',
                    'serial_number',
                    'asset_make',
                    'model_number',
                    'asset_type'
                  ]}
                >
                  <Table.Cell>
                    <ActionComponent
                      onViewClick={() => { props.handleViewAsset(asset.serial_number); }}
                    />
                  </Table.Cell>
                </TableRowComponent>
              );
            })
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              {!props.emptyAssetsCheck() && (
                <Pagination
                  totalPages={props.handlePageTotal()}
                  onPageChange={props.handlePaginationChange}
                  activePage={props.activePage}
                />
              )}
              <Button
                circular
                floated="right"
                size="big"
              >
                <ModalComponent
                  modalTitle="Add An Asset"
                  modalSize="large"
                >
                  <AddAssetComponent />
                </ModalComponent>
              </Button>
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
