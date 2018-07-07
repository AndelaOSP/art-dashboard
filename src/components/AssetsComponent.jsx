import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import SideMenuComponent from '../_components/SideMenuComponent';
import AssetsTableContent from './AssetsTableContent';

import '../_css/AssetsComponent.css';
import { getAssetsAction } from '../_actions/assets.action';

export class AssetsComponent extends Component {
  state = {
    activePage: 1,
    limit: 10
  }

  componentDidMount() {
    this.props.getAssetsAction(this.state.activePage);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hasError &&
      (this.props.errorMessage === nextProps.errorMessage)) {
      return false;
    }
    return true;
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getAssetsAction(activePage);
  }

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit)

  emptyAssetsCheck = () => (isEmpty(this.props.assetsList))

  handleViewAsset = (assetSerialNumber) => {
    this.props.history.push(`/assets/${assetSerialNumber}/view`);
  };

  render() {
    return (
      <SideMenuComponent title="Assets">
        <Container>
          <Header className="assets-heading" content="Assets" />
          <AssetsTableContent
            activePage={this.state.activePage}
            activePageAssets={this.props.assetsList}
            emptyAssetsCheck={this.emptyAssetsCheck}
            errorMessage={this.props.errorMessage}
            handlePageTotal={this.handlePageTotal}
            handlePaginationChange={this.handlePaginationChange}
            handleViewAsset={this.handleViewAsset}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
          />
        </Container>
      </SideMenuComponent>
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
