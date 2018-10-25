import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavBarComponent from '../_components/NavBarContainer';
import AssetsTableContent from './AssetsTableContent';
import '../_css/AssetsComponent.css';
import { getAssetsAction, setActivePage } from '../_actions/assets.action';
import { loadAllAssetModels } from '../_actions/assetModels.action';
import { loadDropdownAssetTypes } from '../_actions/assetTypes.actions';
import filterSelection from '../_actions/checkedFilters.actions';
import FilterButton from './common/FilterButton';
import FilterComponent from './common/FilterComponent';

export class AssetsComponent extends Component {
  state = {
    limit: 10
  };

  componentDidMount() {
    this.props.loadAllAssetModels();
    this.props.loadDropdownAssetTypes();
    const assetsEmpty = isEmpty(this.props.assetsList);

    // TODO: fix the logic so that assets are fetched when you create an asset before fetching
    // assets, otherwise, you'll only display 1 row in assets table yet there are more than one
    // assets
    if (assetsEmpty || (!assetsEmpty && this.props.assetsList.length === 1)) {
      this.props.getAssetsAction(this.props.activePage, this.state.limit);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hasError &&
      (this.props.errorMessage === nextProps.errorMessage)) {
      return false;
    }
    return true;
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.getAssetsAction(this.props.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.props.getAssetsAction(activePage, this.state.limit);
    this.props.setActivePage(activePage);
  };

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit);

  emptyAssetsCheck = () => (isEmpty(this.props.assetsList));

  createFilterData = () => {
    const { assetModels, assetTypes } = this.props;

    const allFilters = [];
    const assetFilters = {
      title: 'Asset Types',
      content: []
    };
    const modelNumberFilters = {
      title: 'Model Numbers',
      content: []
    };

    if (!isEmpty(assetTypes) && !isEmpty(assetModels)) {
      assetTypes.map(assetType => (
        assetFilters.content.push({
          id: assetType.id,
          option: assetType.asset_type
        })
      ));

      assetModels.map(assetModel => (
        modelNumberFilters.content.push({
          id: assetModel.id,
          option: assetModel.model_number
        })
      ));

      allFilters.push(assetFilters);
      allFilters.push(modelNumberFilters);
    }

    return allFilters;
  };

  render() {
    const filters = this.createFilterData();

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
            >
              <React.Fragment>
                <FilterComponent
                  index={0}
                  option={filters[0]}
                  selected={this.props.selected}
                  filterSelection={this.props.filterSelection}
                />

                <FilterComponent
                  index={1}
                  option={filters[1]}
                  selected={this.props.selected}
                  filterSelection={this.props.filterSelection}
                />
              </React.Fragment>
            </FilterButton>
          </div>
          <AssetsTableContent
            {...this.props}
            activePage={this.props.activePage}
            activePageAssets={this.props.assetsList}
            emptyAssetsCheck={this.emptyAssetsCheck}
            errorMessage={this.props.errorMessage}
            handlePageTotal={this.handlePageTotal}
            handleRowChange={this.handleRowChange}
            handlePaginationChange={this.handlePaginationChange}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
            limit={this.state.limit}
          />
        </div>
      </NavBarComponent>
    );
  }
}

AssetsComponent.propTypes = {
  assetsCount: PropTypes.number.isRequired,
  assetsList: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  getAssetsAction: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  loadAllAssetModels: PropTypes.func.isRequired,
  loadDropdownAssetTypes: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  assetModels: PropTypes.arrayOf(PropTypes.object),
  assetTypes: PropTypes.arrayOf(PropTypes.object),
  activePage: PropTypes.number,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func.isRequired
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: '',
  activePage: 1,
  isLoading: false
};

const mapStateToProps = ({ assets, assetTypesList, assetModelsList, selected }) => {
  const {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    activePage
  } = assets;
  const { assetModels } = assetModelsList;
  const { assetTypes } = assetTypesList;

  return {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading,
    assetModels,
    assetTypes,
    activePage,
    selected
  };
};

export default connect(mapStateToProps, {
  getAssetsAction,
  loadAllAssetModels,
  loadDropdownAssetTypes,
  setActivePage,
  filterSelection
})(AssetsComponent);
