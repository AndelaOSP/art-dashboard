import React from 'react';
import {
  Header,
  Table,
  Pagination,
  Segment
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
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';

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
      <Table basic>
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
              <ModalComponent modalTitle="Add Asset Model Number">
                <ModelNumberContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Asset Make
              <ModalComponent modalTitle="Add Asset Make">
                <AssetMakeContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Asset Type
              <ModalComponent modalTitle="Add Asset Type">
                <AssetTypesContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Sub-category
              <ModalComponent modalTitle="Add Sub-Category">
                <AddSubCategoryContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Category
              <ModalComponent modalTitle="Add Asset Category">
                <CategoryContainer />
              </ModalComponent>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Action
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
                <Table.Cell>
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
                      id="page-limit"
                      placeHolder="Show Rows"
                      options={rowOptions}
                      upward
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
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired
};

AssetsTableContent.defaultProps = {
  activePage: 1,
  errorMessage: ''
};
export default AssetsTableContent;
