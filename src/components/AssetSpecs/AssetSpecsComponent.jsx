import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Header, Table, Pagination, Segment, Divider } from 'semantic-ui-react';
import _ from 'lodash';

import TableRow from '../TableRowComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../../components/common/DropdownComponent';
import LoaderComponent from '../../components/LoaderComponent';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import { loadAssetSpecs } from '../../_actions/assetSpecs.actions';

import '../../_css/AssetsComponent.css';

export class AssetSpecsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadAssetSpecs(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetSpecs(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetSpecs(activePage, this.state.limit);
  };

  getTotalPages = () => Math.ceil(this.props.assetSpecsCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.specs)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            header="Asset specs not found!"
            message="Please try again later, to see if we'll have Asset specs to show you."
          />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && this.props.hasError) {
      return (
        <NavBarComponent>
          <div className="assets-list">
            <h1>
              An Error Occured
            </h1>
          </div>
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Specs" />
            <Divider id="assets-divider" />
            <div className="header-modal-button">
              <Link to="/asset-specs/create">
                <Button
                  className="filter-button"
                >
                  ADD ASSET SPEC GROUP
                </Button>
              </Link>
            </div>
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Year of Manufacture</Table.HeaderCell>
                <Table.HeaderCell>Processor Speed</Table.HeaderCell>
                <Table.HeaderCell>Screen Size</Table.HeaderCell>
                <Table.HeaderCell>Processor Type</Table.HeaderCell>
                <Table.HeaderCell>Storage</Table.HeaderCell>
                <Table.HeaderCell>Memory</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.specs.map(spec => (
                  <TableRow
                    key={spec.id}
                    data={spec}
                    headings={[
                      'year_of_manufacture',
                      'processor_speed',
                      'screen_size',
                      'processor_type',
                      'storage',
                      'memory'
                    ]}
                  />
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
      </NavBarComponent>
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
  hasError: PropTypes.bool
};

AssetSpecsComponent.defaultProps = {
  hasError: false
};

export default withRouter(connect(mapStateToProps, {
  loadAssetSpecs
})(AssetSpecsComponent));
