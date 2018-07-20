import React from 'react';
import {
  // Button,
  Header,
  // Table,
  Pagination,
  Segment
} from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PropTypes from 'prop-types';
// import TableRowComponent from './TableRowComponent';
import ModalComponent from './common/ModalComponent';
import ActionComponent from './ActionComponent';
import LoaderComponent from './LoaderComponent';
import ModelNumberContainer from '../_components/ModelNumber/ModelNumberContainer';
import AssetTypesContainer from '../_components/AssetTypes/AddAssetTypesContainer';
import CategoryContainer from '../_components/Category/CategoryContainer';
import AssetMakeContainer from '../_components/AssetMake/AssetMakeContainer';
import { ToastMessage } from '../_utils/ToastMessage';
import AddSubCategoryContainer from '../_components/SubCategory/AddSubCategoriesContainer';
// import AddAssetComponent from '../_components/Assets/AddAssetContainer';

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

      <div>
        <Segment.Group horizontal>
          <Segment className="asset-code-section" id="table-heading-section">
            <p className="assets-heading">Asset Code</p>
          </Segment>
          <Segment className="serial-number-section" id="table-heading-section">
            <p className="assets-heading">Serial</p>
          </Segment>
          <Segment className="model-number-section" id="table-heading-section">
            <p className="assets-heading">Model</p>
            <div className="modal-holder">
              <ModalComponent modalTitle="Add Asset Model Number">
                <ModelNumberContainer />
              </ModalComponent>
            </div>
          </Segment>
          <Segment className="make-label-section" id="table-heading-section">
            <p className="assets-heading">Make</p>
            <div className="modal-holder">
              <ModalComponent modalTitle="Add Asset Make">
                <AssetMakeContainer />
              </ModalComponent>
            </div>
          </Segment>
          <Segment className="asset-type-section" id="table-heading-section">
            <p className="assets-heading">Type</p>
            <div className="modal-holder">
              <ModalComponent modalTitle="Add Asset Type">
                <AssetTypesContainer />
              </ModalComponent>
            </div>
          </Segment>
          <Segment className="subcategory-section" id="table-heading-section">
            <p className="assets-heading">Sub-category</p>
            <div className="modal-holder">
              <ModalComponent modalTitle="Add Sub-Category">
                <AddSubCategoryContainer />
              </ModalComponent>
            </div>
          </Segment>
          <Segment className="category-section" id="table-heading-section">
            <p className="assets-heading">Category</p>
            <div className="modal-holder">
              <ModalComponent modalTitle="Add Asset Category">
                <CategoryContainer />
              </ModalComponent>
            </div>
          </Segment>
          <Segment id="table-heading-section">
              Action
          </Segment>
        </Segment.Group>
        {
        props.activePageAssets.map(asset => (
          <Segment.Group horizontal key={asset.id} id="asset-list-data">
            <Segment><p className="asset-content-details-width">{asset.asset_code}</p></Segment>
            <Segment><p className="asset-content-details-width">{asset.serial_number}</p></Segment>
            <Segment><p className="asset-content-details-width">{asset.model_number}</p></Segment>
            <Segment><p className="asset-content-details-width">{asset.make_label}</p></Segment>
            <Segment><p className="asset-content-details-width">{asset.asset_type}</p></Segment>
            <Segment><p className="asset-content-details-width">{asset.asset_sub_category}</p></Segment>
            <Segment><p className="asset-content-details-width">{asset.asset_category}</p></Segment>
            <Segment>
              <ActionComponent
                onViewClick={() => { props.handleViewAsset(asset.serial_number); }}
              />
            </Segment>
          </Segment.Group>
          ))
      }

        {!props.emptyAssetsCheck() && (
          <Pagination
            totalPages={props.handlePageTotal()}
            onPageChange={props.handlePaginationChange}
            activePage={props.activePage}
          />
        )}


      </div>


      {/* <Table basic> */}
      {/* <Table.Header> */}
      {/* <Table.Row> */}
      {/* <Table.HeaderCell className="assets-table-cell"> */}
      {/* <div className="assets-heading"> */}
      {/* Category */}
      {/* <ModalComponent modalTitle="Add Asset Category"> */}
      {/* <CategoryContainer /> */}
      {/* </ModalComponent> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell> */}
      {/* <div className="assets-heading"> */}
      {/* Sub-category */}
      {/* <ModalComponent modalTitle="Add Sub-Category"> */}
      {/* <AddSubCategoryContainer /> */}
      {/* </ModalComponent> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell> */}
      {/* <div className="assets-heading"> */}
      {/* Asset Code */}
      {/* <ModalComponent /> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell> */}
      {/* <div className="assets-heading"> */}
      {/* Serial Number */}
      {/* <ModalComponent /> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell> */}
      {/* <div className="assets-heading"> */}
      {/* Asset Make */}
      {/* <ModalComponent modalTitle="Add Asset Make"> */}
      {/* <AssetMakeContainer /> */}
      {/* </ModalComponent> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell> */}
      {/* <div className="assets-heading"> */}
      {/* Model Number */}
      {/* <ModalComponent modalTitle="Add Asset Model Number"> */}
      {/* <ModelNumberContainer /> */}
      {/* </ModalComponent> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell> */}
      {/* <div className="assets-heading"> */}
      {/* Asset Type */}
      {/* <ModalComponent modalTitle="Add Asset Type"> */}
      {/* <AssetTypesContainer /> */}
      {/* </ModalComponent> */}
      {/* </div> */}
      {/* </Table.HeaderCell> */}
      {/* <Table.HeaderCell className="action-text">Action</Table.HeaderCell> */}
      {/* </Table.Row> */}
      {/* </Table.Header> */}

      {/* <Table.Body> */}
      {/* { */}
      {/* props.activePageAssets.map((asset) => { */}
      {/* return ( */}
      {/* <TableRowComponent */}
      {/* key={asset.id} */}
      {/* data={asset} */}
      {/* headings={[ */}
      {/* 'asset_category', */}
      {/* 'asset_sub_category', */}
      {/* 'asset_code', */}
      {/* 'serial_number', */}
      {/* 'make_label', */}
      {/* 'model_number', */}
      {/* 'asset_type' */}
      {/* ]} */}
      {/* > */}
      {/* <Table.Cell> */}

      {/* </Table.Cell> */}
      {/* </TableRowComponent> */}
      {/* ); */}
      {/* }) */}
      {/* } */}
      {/* </Table.Body> */}

      {/* <Table.Footer> */}
      {/* <Table.Row> */}
      {/* <Table.HeaderCell colSpan="8"> */}
      {/* {!props.emptyAssetsCheck() && ( */}
      {/* <Pagination */}
      {/* totalPages={props.handlePageTotal()} */}
      {/* onPageChange={props.handlePaginationChange} */}
      {/* activePage={props.activePage} */}
      {/* /> */}
      {/* )} */}
      {/* <Button */}
      {/* circular */}
      {/* floated="right" */}
      {/* size="big" */}
      {/* > */}
      {/* <ModalComponent */}
      {/* modalTitle="Add An Asset" */}
      {/* modalSize="large" */}
      {/* > */}
      {/* <AddAssetComponent /> */}
      {/* </ModalComponent> */}
      {/* </Button> */}
      {/* </Table.HeaderCell> */}
      {/* </Table.Row> */}
      {/* </Table.Footer> */}
      {/* </Table> */}
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
