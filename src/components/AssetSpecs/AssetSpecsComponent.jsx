import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from '../TableRowComponent';
import NavbarComponent from '../NavBarComponent';
import DropdownComponent from '../../_components/DropdownComponent';
import LoaderComponent from '../../components/LoaderComponent';
import ActionComponent from '../../components/ActionComponent';

import '../../_css/AssetsComponent.css';
import { loadAssetSpecs } from '../../_actions/assetSpecs.actions';

export class AssetSpecsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }
  componentDidMount() {
    this.props.loadAssetSpecs(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetSpecs(activePage);
  }

  getTotalPages = () => Math.ceil(this.props.assetSpecsCount / this.state.limit)

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.specs)) {
      return (
        <NavbarComponent>
          <div className="assets-list">
            <h1>
              No Asset Spec Found
            </h1>
          </div>
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && this.props.hasError) {
      return (
        <NavbarComponent>
          <div className="assets-list">
            <h1>
              An Error Occured
            </h1>
          </div>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Specs" />
            <Divider id="assets-divider" />
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Year of Manufacture</Table.HeaderCell>
                <Table.HeaderCell>Processor Speed</Table.HeaderCell>
                <Table.HeaderCell>Screen Size</Table.HeaderCell>
                <Table.HeaderCell>Processor Type</Table.HeaderCell>
                <Table.HeaderCell>Storage</Table.HeaderCell>
                <Table.HeaderCell>Memory</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.specs.map(spec => (
                  <TableRowComponent
                    key={spec.id}
                    data={spec}
                    headings={[
                      'id',
                      'year_of_manufacture',
                      'processor_speed',
                      'screen_size',
                      'processor_type',
                      'storage',
                      'memory'
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
                {!_.isEmpty(this.props.specs) && (
                <Table.HeaderCell colSpan="8" id="pagination-header">
                  <Segment.Group horizontal id="art-pagination-section">
                    <Segment>
                      <Pagination
                        totalPages={this.getTotalPages()}
                        onPageChange={this.handlePaginationChange}
                        activePage={this.state.activePage}
                      />
                    </Segment>
                    <Segment>
                      <DropdownComponent />
                    </Segment>
                  </Segment.Group>
                </Table.HeaderCell>
                  )}
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavbarComponent>
    );
  }
}

const mapStateToProps = ({ assetSpecs }) => {
  const { specs, assetSpecsCount, isLoading, hasError } = assetSpecs;
  return {
    specs,
    assetSpecsCount,
    isLoading,
    hasError
  };
};

AssetSpecsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetSpecs: PropTypes.func.isRequired,
  specs: PropTypes.array.isRequired,
  assetSpecsCount: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAssetSpecs
})(AssetSpecsComponent));
