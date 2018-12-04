import React, { Component } from 'react';
import { Header, Divider, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import AssetsTabComponent from '../components/Assets/AssetsTabComponent';
import NavBarComponent from '../_components/NavBarContainer';
import { isCountCutoffExceeded, fetchData } from '../_utils/helpers';
import { constructUrl } from '../_utils/assets';

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
    const { assets } = this.state;
    const { status } = this.props;
    const totalPages = this.handlePageTotal();
    const currentAssets = `page_${this.props.activePage}`;
    const showPaginator = totalPages > 1;
    const showFilter = !isEmpty(this.props.assetsList[currentAssets] || assets);

    const contentTitle = status ? `${status.toLocaleString()} Assets` : 'Assets';

    const { assets } = this.state;

    return (
      <NavBarComponent title="Assets">
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content={contentTitle} />
            <Divider id="assets-divider" />
          </div>
          <AssetsTabComponent
            activePage={this.props.activePage}
            limit={this.state.limit}
            selected={this.props.selected}
            filterAction={this.props.getAssetsAction}
            filterData={this.props.filterData}
            filterSelection={this.props.filterSelection}
            errorMessage={this.props.errorMessage}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
            handleRowChange={this.handleRowChange}
            handlePaginationChange={this.handlePaginationChange}
            assetsList={this.props.assetsList}
            totalPages={totalPages}
            showPaginator={showPaginator}
            currentAssets={currentAssets}
            assets={assets}
          />
        </div>
      </NavBarComponent>
    );
  }
}

AssetsComponent.propTypes = {
  assetsCount: PropTypes.number.isRequired,
  assetsList: PropTypes.objectOf(PropTypes.array),
  getAssetsAction: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  loadAllAssetModels: PropTypes.func.isRequired,
  loadDropdownAssetTypes: PropTypes.func.isRequired,
  resetAssets: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  activePage: PropTypes.number,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func.isRequired,
  filterData: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  status: PropTypes.string,
  shouldReload: PropTypes.bool
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: '',
  activePage: 1,
  isLoading: false
};
