import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Container, Header, Table, Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoaderComponent from './LoaderComponent';
import TableRowComponent from './TableRowComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import ActionComponent from './ActionComponent';

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

  emptyAssetTypeCheck = () => (this.props.assets.length === 0)

  loadTableContent = () => {
    if (this.props.isLoading) {
      return <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />;
    }
    if (this.props.hasError) {
      return <Header as="h3">An error has occured</Header>;
    }
    if (this.emptyAssetTypeCheck()) {
      return (
        <Header as="h3">There are no assets assigned to you</Header>
      );
    }

    return (
      <div>
        <Button icon labelPosition="left" floated="right" className="add-asset">
          <Icon name="add" />
          Add Asset
        </Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset Code</Table.HeaderCell>
              <Table.HeaderCell>Serial Number</Table.HeaderCell>
              <Table.HeaderCell>Model Number</Table.HeaderCell>
              <Table.HeaderCell>Checkin Status</Table.HeaderCell>
              <Table.HeaderCell>Current Status</Table.HeaderCell>
              <Table.HeaderCell>Asset Type</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.state.activePageAssets.map(asset => (
                <TableRowComponent
                  key={asset.id}
                  data={asset}
                  headings={[
                    'asset_code',
                    'serial_number',
                    'model_number',
                    'checkin_status',
                    'current_status',
                    'asset_type'
                  ]}
                >
                  <Table.Cell>
                    <ActionComponent />
                  </Table.Cell>
                </TableRowComponent>
              ))
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                {
                  (this.emptyAssetTypeCheck()) ? '' :
                  <Pagination
                    totalPages={this.handlePageTotal()}
                    onPageChange={this.handlePaginationChange}
                    activePage={this.state.activePage}
                  />
                }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>);
  }

  render() {
    return (
      <SideMenuComponent title="Assets">
        <Container>
          <Header className="assets-heading" content="My Assets" />
          {this.loadTableContent()}
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
