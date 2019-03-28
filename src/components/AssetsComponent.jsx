import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import AssetsTableContent from './AssetsTableContent';
import PaginationComponent from './common/PaginationComponent';
import Filter from './common/Filter/Filter';
import ExportAsset from './Assets/ExportAsset';
import { isCountCutoffExceeded, fetchData } from '../_utils/helpers';
import constructUrl from '../_utils/assets';

import '../_css/AssetsComponent.css';

const CUTOFF_LIMIT = 100;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);

export default class AssetsComponent extends Component {
  state = {
    limit: 10,
    assets: []
  };

  componentDidMount() {
    const { activePage, match, selected } = this.props;
    const { status } = match.params;

    const shouldFetchAssets = this.checkIfShouldFetchAssets();

    // TODO: fix the logic so that assets are fetched when you create an asset before fetching
    // assets, otherwise, you'll only display 1 row in assets table yet there are more than one
    // assets
    if (shouldFetchAssets) {
      this.retrieveAssets(activePage, this.state.limit, status, selected);
    }

    this.props.loadAllAssetModels();
    this.props.loadDropdownAssetTypes();
  }

  componentDidUpdate(prevProps) {
    const { activePage, match, shouldReload, selected } = this.props;
    const { status } = match.params;

    if (shouldReload !== prevProps.shouldReload && shouldReload) {
      this.props.resetAssets();
      this.retrieveAssets(activePage, this.state.limit, status, selected);
    }
  }

  checkIfShouldFetchAssets = () => {
    const { activePage, shouldReload, assetsList } = this.props;
    const pageKey = `page_${activePage}`;
    const activePageAssets = assetsList[pageKey] || this.state.assets;

    return shouldReload || isEmpty(activePageAssets);
  };

  handleRowChange = (e, data) => {
    const { activePage, match, selected } = this.props;
    const { status } = match.params;

    this.setState({ limit: data.value });
    this.props.resetAssets();

    this.retrieveAssets(activePage, data.value, status, selected);
  };

  handlePaginationChange = (e, { activePage }) => {
    const { match, selected } = this.props;
    const { status } = match.params;

    this.props.setActivePage(activePage);
    const currentPageList = this.props.assetsList[`page_${activePage}`];

    if (isEmpty(currentPageList)) {
      this.retrieveAssets(activePage, this.state.limit, status, selected);
    }
  };

  retrieveAssets = (activePage, limit, status, filters = {}) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      const url = constructUrl(activePage, limit, filters, status);

      this.props.loading(true);
      return fetchData(url).then((response) => {
        this.props.loading(false);
        this.setState({ assets: response.data.results });
      });
    }

    return this.props.getAssetsAction(activePage, limit, filters, status);
  };

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit);

  render() {
    const {
      assets,
      limit
    } = this.state;
    const {
      status,
      exportAsset,
      exportAssetsAction,
      activePage,
      assetsList,
      filterData,
      selected,
      filterSelection,
      getAssetsAction,
      isLoading,
      errorMessage,
      hasError
    } = this.props;
    const totalPages = this.handlePageTotal();
    const currentAssets = `page_${this.props.activePage}`;

    return (
      <Fragment>
        <ExportAsset
          assets={assetsList[currentAssets] || assets}
          exportAsset={exportAsset}
          exportAssetsAction={exportAssetsAction}
        />
        <Filter
          activePage={activePage}
          limit={limit}
          filterData={filterData}
          selected={selected}
          filterSelection={filterSelection}
          filterAction={getAssetsAction}
          disabled={isLoading}
        />
        <AssetsTableContent
          activePage={activePage}
          assets={assetsList[currentAssets] || assets}
          errorMessage={errorMessage}
          hasError={hasError}
          isLoading={isLoading}
          status={status}
        />
        <PaginationComponent
          activePage={activePage}
          handleRowChange={this.handleRowChange}
          handlePaginationChange={this.handlePaginationChange}
          limit={limit}
          totalPages={totalPages}
          isLoading={isLoading}
        />
      </Fragment>
    );
  }
}

AssetsComponent.propTypes = {
  assetsCount: PropTypes.number.isRequired,
  assetsList: PropTypes.object,
  errorMessage: PropTypes.string,
  getAssetsAction: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  loadAllAssetModels: PropTypes.func.isRequired,
  exportAssetsAction: PropTypes.func.isRequired,
  loadDropdownAssetTypes: PropTypes.func.isRequired,
  resetAssets: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  activePage: PropTypes.number,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func.isRequired,
  filterData: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  exportAsset: PropTypes.object,
  status: PropTypes.string,
  shouldReload: PropTypes.bool
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: '',
  activePage: 1,
  isLoading: false
};
