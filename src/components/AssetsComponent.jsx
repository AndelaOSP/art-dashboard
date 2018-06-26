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
    activePageAssets: [],
    limit: 8,
    offset: 0
  }

  componentDidMount() {
    this.props.getAssetsAction();
  }

  componentDidUpdate(prevProps) {
    if (this.props.assets !== prevProps.assets) {
      this.handlePageContent();
    }
  }

  handlePageContent = () => {
    const { activePage, limit, offset } = this.state;
    const endIndex = (limit * activePage) - 1;
    const assets = this.props.assets.slice(offset, endIndex);
    this.setState({
      activePageAssets: assets
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    const newPageOffset = (activePage - 1) * this.state.limit;
    this.setState({ activePage, offset: newPageOffset }, () => {
      this.handlePageContent();
    });
  }

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit)

  emptyAssetsCheck = () => (isEmpty(this.props.assets))

  render() {
    return (
      <SideMenuComponent title="Assets">
        <Container>
          <Header className="assets-heading" content="My Assets" />
          <AssetsTableContent
            activePage={this.state.activePage}
            activePageAssets={this.state.activePageAssets}
            emptyAssetsCheck={this.emptyAssetsCheck}
            handlePageTotal={this.handlePageTotal}
            handlePaginationChange={this.handlePaginationChange}
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
  assets: PropTypes.arrayOf(PropTypes.object),
  getAssetsAction: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

AssetsComponent.defaultProps = {
  assets: []
};

const mapStateToProps = ({ viewAssets }) => {
  const { assets, assetsCount, hasError, isLoading } = viewAssets;
  return {
    assets,
    assetsCount,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getAssetsAction
})(AssetsComponent);
