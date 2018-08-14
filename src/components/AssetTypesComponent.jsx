import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider, Button, Container } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from './TableRowComponent';
import rowOptions from '../_utils/pageRowOptions';
import NavbarComponent from './NavBarComponent';
import DropdownComponent from '../components/common/DropdownComponent';
import LoaderComponent from '../components/LoaderComponent';

import '../_css/AssetsComponent.css';
import { loadAssetTypes } from '../_actions/assetTypes.actions';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadAssetTypes(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetTypes(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetTypes(activePage, this.state.limit);
  };

  getTotalPages = () => Math.ceil(this.props.assetTypesCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && this.props.hasError) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              An Error Occurred While Trying To Display The Asset Types.
            </h1>
            <Button onClick={() => { this.props.loadAssetTypes(this.state.activePage); }}>
              Try Again.
            </Button>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Types" />
            <Divider id="assets-divider" />
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sub-category</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                (_.isEmpty(this.props.assetTypes))
                ? <Table.Row><Table.Cell colSpan="2">No Asset Types Found</Table.Cell></Table.Row>
                : this.props.assetTypes.map(assetType => (
                  <TableRowComponent
                    key={assetType.id}
                    data={assetType}
                    headings={['asset_sub_category', 'asset_type']}
                  />
                   ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.assetTypes) && (
                  <Table.HeaderCell colSpan="3" id="pagination-header">
                    <Segment.Group horizontal id="art-pagination-section">
                      <Segment>
                        <Pagination
                          totalPages={this.getTotalPages()}
                          onPageChange={this.handlePaginationChange}
                          activePage={this.state.activePage}
                        />
                      </Segment>
                      <Segment>
                        <DropdownComponent
                          customClass="page-limit"
                          placeHolder="Show Rows"
                          options={rowOptions}
                          upward
                          value={this.state.limit}
                          onChange={this.handleRowChange}
                        />
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

const mapStateToProps = ({ assetTypesList }) => {
  const { assetTypes, assetTypesCount, isLoading, hasError } = assetTypesList;
  return {
    assetTypes,
    assetTypesCount,
    isLoading,
    hasError
  };
};

AssetTypesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  assetTypes: PropTypes.array.isRequired,
  assetTypesCount: PropTypes.number.isRequired,
  hasError: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, {
  loadAssetTypes
})(AssetTypesComponent));
