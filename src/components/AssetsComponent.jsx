import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import NavbarComponent from './NavBarComponent';
import AssetsTableContent from './AssetsTableContent';
import '../_css/AssetsComponent.css';
import { getAssetsAction } from '../_actions/assets.action';
import FilterButton from './common/FilterButton';
import FilterComponent from './common/FilterComponent';

import assetsFilter from '../_mock/assetsFilter';

export class AssetsComponent extends Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.getAssetsAction(this.state.activePage, this.state.limit);
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
    this.props.getAssetsAction(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getAssetsAction(activePage, this.state.limit);
  };

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit);

  emptyAssetsCheck = () => (isEmpty(this.props.assetsList));

  toggleFilter = () => {
    this.setState(({ toggleOn }) => ({ toggleOn: !toggleOn }));
  };

  render() {
    return (
      <NavbarComponent title="Assets">
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Assets List" />
            <Divider id="assets-divider" />
            <FilterButton
              render={toggleOn => (
                <FilterComponent options={assetsFilter} toggleOn={toggleOn} />
              )}
            />
          </div>
          <AssetsTableContent
            {...this.props}
            activePage={this.state.activePage}
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
  hasError: PropTypes.bool.isRequired,
  history: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: ''
};

const mapStateToProps = ({ assets }) => {
  const { assetsList, assetsCount, errorMessage, hasError, isLoading } = assets;
  return {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getAssetsAction
})(AssetsComponent);
