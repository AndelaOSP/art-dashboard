import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider, Container, Button } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from '../TableRowComponent';
import NavbarComponent from '../NavBarComponent';
import DropdownComponent from '../../_components/DropdownComponent';
import LoaderComponent from '../../components/LoaderComponent';
import { loadAssetMakes } from '../../_actions/assetMakes.actions';
import rowOptions from '../../_utils/pageRowOptions';

export class AssetMakeComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadAssetMakes(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetMakes(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetMakes(activePage, this.state.limit);
  };

  getTotalPages = () => Math.ceil(this.props.assetMakesCount / this.state.limit);

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
              An Error Occurred While Trying To Display The Asset Makes.
            </h1>
            <Button onClick={() => { this.props.loadAssetMakes(this.state.activePage); }}>
              Try Again.
            </Button>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="incidence-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Makes" />
            <Divider id="assets-divider" />
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Make</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                (_.isEmpty(this.props.assetMakes))
                ? <Table.Row><Table.Cell colSpan="3">No Asset Make Found</Table.Cell></Table.Row>
                : this.props.assetMakes.map(asset => (
                  <TableRowComponent
                    key={asset.id}
                    data={asset}
                    headings={['id', 'asset_type', 'make_label']}
                  />
                   ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.assetMakes) && (
                  <Table.HeaderCell colSpan="4" id="pagination-header">
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

const mapStateToProps = ({ assetMakesList }) => {
  const { assetMakes, assetMakesCount, isLoading, hasError } = assetMakesList;
  return {
    assetMakes,
    assetMakesCount,
    isLoading,
    hasError
  };
};

AssetMakeComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetMakes: PropTypes.func.isRequired,
  assetMakes: PropTypes.array.isRequired,
  assetMakesCount: PropTypes.number.isRequired,
  hasError: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, {
  loadAssetMakes
})(AssetMakeComponent));
