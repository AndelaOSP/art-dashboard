import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Table,
  Pagination,
  Segment,
  Divider,
  Button
} from 'semantic-ui-react';
import _ from 'lodash';

import TableRow from '../TableRowComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../common/DropdownComponent';
import LoaderComponent from '../LoaderComponent';
import ModalComponent from '../common/ModalComponent';
import AddSubCategoryContainer from '../../_components/SubCategory/AddSubCategoriesContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import { loadSubCategories } from '../../_actions/subcategory.actions';

import '../../_css/AssetsComponent.css';

export class AssetSubCategoriesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
    modalOpen: false
  };

  componentDidMount() {
    this.props.loadSubCategories(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadSubCategories(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadSubCategories(activePage, this.state.limit);
  };

  handleToggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  getTotalPages = () => Math.ceil(this.props.assetSubCategoriesCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetSubCategories)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            header="No Asset subcategory found!"
            message="Please try again later to see if there will be asset subcategories to show you."
          />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Sub-Categories" />
            <Divider id="assets-divider" />
            <div className="header-modal-button">
              <ModalComponent
                trigger={
                  <Button
                    className="filter-button"
                  >
                    ADD SUB-CATEGORY
                  </Button>
                }
                modalTitle="Add Sub-Category"
                toggleModal={this.handleToggleModal}
                modalOpen={this.state.modalOpen}
              >
                <AddSubCategoryContainer />
              </ModalComponent>
            </div>
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sub-Category</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetSubCategories.map(subCategory => (
                  <TableRow
                    key={subCategory.id}
                    data={subCategory}
                    headings={['sub_category_name', 'asset_category']}
                  />
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.assetSubCategories) && (
                  <Table.HeaderCell colSpan="4" id="pagination-header">
                    <Segment.Group horizontal id="art-pagination-section">
                      <Segment>
                        <Pagination
                          totalPages={this.getTotalPages()}
                          onPageChange={this.handlePaginationChange}
                          activePage={this.state.activePage}
                        />
                      </Segment>
                      <Segment>
                        <DropdownComponent
                          customClass="page-limit"
                          placeHolder="Show Rows"
                          options={rowOptions}
                          upward
                          value={this.state.limit}
                          onChange={this.handleRowChange}
                        />
                      </Segment>
                    </Segment.Group>
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavBarComponent>
    );
  }
}

const mapStateToProps = ({ subcategoriesList }) => {
  const { assetSubCategories, assetSubCategoriesCount, isLoading } = subcategoriesList;
  return {
    assetSubCategories,
    assetSubCategoriesCount,
    isLoading
  };
};

AssetSubCategoriesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadSubCategories: PropTypes.func.isRequired,
  assetSubCategories: PropTypes.array.isRequired,
  assetSubCategoriesCount: PropTypes.number.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadSubCategories
})(AssetSubCategoriesComponent));
