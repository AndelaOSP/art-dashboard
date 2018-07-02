import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Table, Button, Pagination } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from './TableRowComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import LoaderComponent from '../components/LoaderComponent';
import ActionComponent from '../components/ActionComponent';
import '../_css/AssetTypesComponent.css';

import { loadAssetTypes } from '../_actions/assetTypes.actions';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
    offset: 0,
    currentAssetTypes: []
  }
  componentDidMount() {
    this.props.loadAssetTypes();
    this.setCurrentAssetTypes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.assetTypes.length !== prevProps.assetTypes.length) {
      this.setCurrentAssetTypes();
    }
  }

  getOffset = (activePage, limit) => (activePage - 1) * limit;

  setCurrentAssetTypes = () => {
    const currentAssetTypes = this.props.assetTypes.slice(
      this.state.offset,
      (this.state.activePage * this.state.limit)
    );
    this.setState({
      currentAssetTypes
    });
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      activePage,
      offset: this.getOffset(activePage, this.state.limit)
    }, () => this.setCurrentAssetTypes());
  }

  getTotalPages = () => Math.ceil(this.props.assetTypes.length / this.state.limit)

  render() {
    if (this.props.isLoading) {
      return (
        <SideMenuComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </SideMenuComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetTypes)) {
      return (
        <SideMenuComponent>
          <Container>
            <h1>
              Unable to load Asset Types, logout and in again.
            </h1>
          </Container>
        </SideMenuComponent>
      );
    }
    return (
      <SideMenuComponent>
        <Container>
          <Header className="landing-heading" content="Asset Types" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Sub-category</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.currentAssetTypes.map(assetType => (
                  <TableRowComponent
                    key={assetType.id}
                    data={assetType}
                    headings={['id', 'asset_type', 'asset_sub_category']}
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
                <Table.HeaderCell colSpan="4">
                  {!_.isEmpty(this.state.currentAssetTypes) &&
                    <Pagination
                      totalPages={this.getTotalPages()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                  }
                  <Button circular icon="add" floated="right" data-tooltip="Add new asset types" size="big" />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </SideMenuComponent>
    );
  }
}

const mapStateToProps = ({ assetTypesList }) => {
  const { assetTypes, isLoading } = assetTypesList;
  return {
    assetTypes,
    isLoading
  };
};

AssetTypesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  assetTypes: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAssetTypes
})(AssetTypesComponent));
