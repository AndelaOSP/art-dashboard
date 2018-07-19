import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Table, Button, Pagination } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from './TableRowComponent';
import AssetTypesAction from './AssetTypesAction';
import NavbarComponent from './NavBarComponent';
import LoaderComponent from '../components/LoaderComponent';
import '../_css/AssetTypesComponent.css';

import { loadAssetTypes } from '../_actions/assetTypes.actions';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }
  componentDidMount() {
    this.props.loadAssetTypes(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetTypes(activePage, this.state.limit);
  }

  getTotalPages = () => Math.ceil(this.props.assetTypesCount / this.state.limit)

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetTypes)) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              No Asset Types Found
            </h1>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <Container>
          <Header className="landing-heading" content="Asset Types" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sub-category</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetTypes.map(assetType => (
                  <TableRowComponent
                    key={assetType.id}
                    data={assetType}
                    headings={['asset_sub_category', 'asset_type']}
                  >
                    <Table.Cell>
                      <AssetTypesAction details={assetType} />
                    </Table.Cell>
                  </TableRowComponent>
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  {!_.isEmpty(this.props.assetTypes) &&
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
      </NavbarComponent>
    );
  }
}

const mapStateToProps = ({ assetTypesList }) => {
  const { assetTypes, assetTypesCount, isLoading } = assetTypesList;
  return {
    assetTypes,
    assetTypesCount,
    isLoading
  };
};

AssetTypesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  assetTypes: PropTypes.array.isRequired,
  assetTypesCount: PropTypes.number.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAssetTypes
})(AssetTypesComponent));
