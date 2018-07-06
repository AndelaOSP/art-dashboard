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
import ArtModal from './common/ModalComponent';
import '../_css/AssetTypesComponent.css';

import { loadAssetTypes } from '../_actions/assetTypes.actions';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }
  componentDidMount() {
    this.props.loadAssetTypes(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetTypes(activePage);
  }

  formatDate = (assetType, key) => {
    const date = new Date(assetType[key]);
    const model = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    return new Intl.DateTimeFormat('en-GB', model).format(date);
  }

  getTotalPages = () => Math.ceil(this.props.assetTypesCount / this.state.limit)

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
              No Asset Types Found
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
                this.props.assetTypes.map(assetType => (
                  <TableRowComponent
                    key={assetType.id}
                    data={assetType}
                    headings={['id', 'asset_sub_category', 'asset_type']}
                  >
                    <Table.Cell>
                      <ActionComponent
                        viewWrapper={element => (
                          <ArtModal
                            className="inline"
                            trigger={element}
                            modalTitle={assetType.asset_type}
                          >
                            {
                              Object.keys(assetType).map(
                                (key) => {
                                  if (key === 'created_at' || key === 'last_modified') {
                                  return <div className="bottom-20" key={key}>{key}: {this.formatDate(assetType, key)}</div>;
                                }
                                  return <div className="bottom-20" key={key}>{key}: {assetType[key]}</div>;
                                }
                              )
                            }
                          </ArtModal>
                        )}
                      />
                    </Table.Cell>
                  </TableRowComponent>
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
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
      </SideMenuComponent>
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
