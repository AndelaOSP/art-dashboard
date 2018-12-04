import React, { Component } from 'react';
import { Header, Divider, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavBarComponent from '../_components/NavBarContainer';
import AssetsTableContent from './AssetsTableContent';
import FilterButton from './common/FilterButton';
import FilterComponent from './common/FilterComponent';
import PaginationComponent from './common/PaginationComponent';
import UploadAssetsContainer from '../_components/Assets/UploadAssetsContainer';
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
    const { activePage, match, shouldFetchAssets } = this.props;
    const { status } = match.params;

    // TODO: fix the logic so that assets are fetched when you create an asset before fetching
    // assets, otherwise, you'll only display 1 row in assets table yet there are more than one
    // assets
    if (shouldFetchAssets) {
      this.loadAssets(activePage, this.state.limit, null, status);
    }

    this.props.loadAllAssetModels();
    this.props.loadDropdownAssetTypes();
  }

  componentDidUpdate(prevProps) {
    const { activePage, match, shouldReload } = this.props;
    const { status } = match.params;

    if (shouldReload !== prevProps.shouldReload && shouldReload) {
      this.props.resetAssets();
      this.loadAssets(activePage, this.state.limit, null, status);
    }
  }

  loadAssets = (activePage, limit, filters, status) =>
    this.props.getAssetsAction(activePage, limit, filters, status);

  handleRowChange = (e, data) => {
    const { activePage, match } = this.props;
    const { status } = match.params;

    this.setState({ limit: data.value });
    this.props.resetAssets();

    this.loadAssets(activePage, data.value, null, status);
  };

  handlePaginationChange = (e, { activePage }) => {
    const { match, selected } = this.props;
    const { status } = match.params;

    this.props.setActivePage(activePage);
    const currentPageList = this.props.assetsList[`page_${activePage}`];

    if (isEmpty(currentPageList)) {
      this.retrieveAssets(
        activePage,
        this.state.limit,
        status,
        selected
      );
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

    return this.loadAssets(activePage, limit, filters, status);
  };

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit);

  render() {
    const { assets } = this.state;
    const { status } = this.props;
    const totalPages = this.handlePageTotal();
    const showPaginator = totalPages > 1;
    const currentAssets = `page_${this.props.activePage}`;
    const showFilter = !isEmpty(this.props.assetsList[currentAssets] || assets);

    const contentTitle = status ? `${status.toLocaleString()} Assets` : 'Assets';

    const { assets } = this.state;


    const panes = [
      {
        menuItem: 'All Assets',
        render: () => (
          <Tab.Pane>
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
          </Tab.Pane>)
      },
      {
        menuItem: 'Import Assets',
        render: () => (
          <Tab.Pane>
            <UploadAssetsContainer />
          </Tab.Pane>)
      }
    ];
    return (
      <NavBarComponent title="Assets">
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content={contentTitle} />
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
          <Tab panes={panes} />
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
  filterData: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  status: PropTypes.string,
  shouldFetchAssets: PropTypes.bool,
  shouldReload: PropTypes.bool
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: '',
  activePage: 1,
  isLoading: false
};
