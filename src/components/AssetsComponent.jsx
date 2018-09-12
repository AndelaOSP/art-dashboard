import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavbarComponent from './NavBarComponent';
import AssetsTableContent from './AssetsTableContent';
import '../_css/AssetsComponent.css';
import { getAssetsAction, setActivePage } from '../_actions/assets.action';
import { loadAllAssetModels } from '../_actions/assetModels.action';
import { loadDropdownAssetTypes } from '../_actions/assetTypes.actions';
import FilterButton from './common/FilterButton';
import FilterComponent from './common/FilterComponent';

export class AssetsComponent extends Component {
  state = {
    limit: 10
  };

  componentDidMount() {
    this.props.loadAllAssetModels();
    this.props.loadDropdownAssetTypes();
    if (isEmpty(this.props.assetsList)) {
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

    const filters = [];
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

      filters.push(assetFilters);
      filters.push(modelNumberFilters);
    }

    return filters;
  };

  render() {
    const filterSets = {
      'Asset Types': new Set(),
      'Model Numbers': new Set()
    };

    return (
      <NavbarComponent title="Assets">
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Assets List" />
            <Divider id="assets-divider" />
            <FilterButton
              render={toggleOn => (
                <FilterComponent
                  options={this.createFilterData()}
                  filterSets={filterSets}
                  toggleOn={toggleOn}
                  activePage={this.props.activePage}
                  limit={this.state.limit}
                  filterAction={this.props.getAssetsAction}
                />
              )}
            />
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
      </NavbarComponent>
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
  isLoading: PropTypes.bool.isRequired,
  assetModels: PropTypes.arrayOf(PropTypes.object),
  assetTypes: PropTypes.arrayOf(PropTypes.object),
  activePage: PropTypes.number
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: '',
  activePage: 1
};

const mapStateToProps = ({ assets, assetTypesList, assetModelsList }) => {
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
    activePage
  };
};

export default connect(mapStateToProps, {
  getAssetsAction,
  loadAllAssetModels,
  loadDropdownAssetTypes,
  setActivePage
})(AssetsComponent);
