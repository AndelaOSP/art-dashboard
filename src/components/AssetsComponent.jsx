import React, { Component } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavBarComponent from '../_components/NavBarContainer';
import AssetsTableContent from './AssetsTableContent';
import FilterButton from './common/FilterButton';
import FilterComponent from './common/FilterComponent';
import PaginationComponent from './common/PaginationComponent';
import { isCountCutoffExceeded, fetchData } from '../_utils/helpers';
import '../_css/AssetsComponent.css';

const CUTOFF_LIMIT = 50;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);

export default class AssetsComponent extends Component {
  state = {
    limit: 10,
    assets: []
  };

  componentDidMount() {
    const { activePage, assetsList } = this.props;

    const assetsEmpty = isEmpty(assetsList);

    // TODO: fix the logic so that assets are fetched when you create an asset before fetching
    // assets, otherwise, you'll only display 1 row in assets table yet there are more than one
    // assets
    if (assetsEmpty) {
      this.props.getAssetsAction(activePage, this.state.limit);
    }

    this.props.loadAllAssetModels();
    this.props.loadDropdownAssetTypes();
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.resetAssets();
    this.props.getAssetsAction(this.props.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.setActivePage(activePage);
    const currentPageList = this.props.assetsList[`page_${activePage}`];

    if (isEmpty(currentPageList)) {
      this.retrieveAssets(activePage, this.state.limit);
    }
  };

  retrieveAssets = (activePage, limit) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      const url = `manage-assets?page=${activePage}&page_size=${limit}`;
      this.props.loading(true);
      return fetchData(url).then((response) => {
        this.props.loading(false);
        this.setState({ assets: response.data.results });
      });
    }
    return this.props.getAssetsAction(activePage, limit);
  };

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit);

  render() {
    const totalPages = this.handlePageTotal();
    const showPaginator = totalPages > 0;
    const currentAssets = `page_${this.props.activePage}`;
    const { assets } = this.state;
    return (
      <NavBarComponent title="Assets">
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Assets List" />
            <Divider id="assets-divider" />
            <FilterButton
              activePage={this.props.activePage}
              limit={this.state.limit}
              selected={this.props.selected}
              filterAction={this.props.getAssetsAction}
              disabled={this.props.isLoading}
            >
              <React.Fragment>
                <FilterComponent
                  index={0}
                  option={this.props.filterData[0]}
                  selected={this.props.selected}
                  filterSelection={this.props.filterSelection}
                />

                <FilterComponent
                  index={1}
                  option={this.props.filterData[1]}
                  selected={this.props.selected}
                  filterSelection={this.props.filterSelection}
                />
              </React.Fragment>
            </FilterButton>
          </div>
          <AssetsTableContent
            activePage={this.props.activePage}
            assets={this.props.assetsList[currentAssets] || assets}
            errorMessage={this.props.errorMessage}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
          />
          {showPaginator && (
            <PaginationComponent
              activePage={this.props.activePage}
              handleRowChange={this.handleRowChange}
              handlePaginationChange={this.handlePaginationChange}
              limit={this.state.limit}
              totalPages={totalPages}
              isLoading={this.props.isLoading}
            />
          )}
        </div>
      </NavBarComponent>
    );
  }
}

AssetsComponent.propTypes = {
  assetsCount: PropTypes.number.isRequired,
  assetsList: PropTypes.objectOf(PropTypes.array),
  errorMessage: PropTypes.string,
  getAssetsAction: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  loadAllAssetModels: PropTypes.func.isRequired,
  loadDropdownAssetTypes: PropTypes.func.isRequired,
  resetAssets: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  activePage: PropTypes.number,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func.isRequired,
  filterData: PropTypes.arrayOf(PropTypes.object)
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: '',
  activePage: 1,
  isLoading: false
};
