import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'semantic-ui-react';

import Cards from '../common/Card/Card';
import NavBarComponent from '../../_components/NavBarContainer';
import PageHeader from '../common/PageHeader';
import LoaderComponent from '../LoaderComponent';
import ModalComponent from '../common/ModalComponent';
import CategoryContainer from '../../_components/Category/CategoryContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import Paginator from '../common/PaginationComponent';

import '../../_css/AssetsComponent.css';

export class AssetCategoriesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
    modalOpen: false
  };

  componentDidMount() {
    this.props.loadAssetCategories(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetCategories(activePage, this.state.limit);
  };

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetCategories(this.state.activePage, data.value);
  };

  handlePageTotal = () => Math.ceil(this.props.assetCategoriesCount / this.state.limit);

  handleToggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  emptyCategoriesCheck = () => _.isEmpty(this.props.categories);

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && this.props.hasError) {
      return (
        <NavBarComponent>
          <div className="assets-list">
            <h1>An Error Occurred While Trying To Display The Asset Categories</h1>
            <Button
              onClick={() => {
                this.props.loadAssetCategories(this.state.activePage);
              }}
            >
              Try Again
            </Button>
          </div>
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && this.emptyCategoriesCheck()) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent message="Please try again later to see if there will be asset categories to show you." />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="assets-list">
          <PageHeader header="Asset Categories">
            <div className="header-modal-button">
              <ModalComponent
                trigger={<Button className="filter-button">ADD CATEGORY</Button>}
                modalTitle="Add Asset Category"
                toggleModal={this.handleToggleModal}
                modalOpen={this.state.modalOpen}
              >
                <CategoryContainer />
              </ModalComponent>
            </div>
          </PageHeader>

          <Cards data={this.props.categories} headings={['name']} imageName="category.svg" />

          <Paginator
            activePage={this.state.activePage}
            handleRowChange={this.handleRowChange}
            handlePaginationChange={this.handlePaginationChange}
            limit={this.state.limit}
            totalPages={this.handlePageTotal()}
            isLoading={this.props.isLoading}
          />
        </div>
      </NavBarComponent>
    );
  }
}

AssetCategoriesComponent.propTypes = {
  categories: PropTypes.array.isRequired,
  assetCategoriesCount: PropTypes.number.isRequired,
  loadAssetCategories: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default AssetCategoriesComponent;
