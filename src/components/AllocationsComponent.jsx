import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { loadAllocationsAction } from '../_actions/allocations.actions';
import NavbarComponent from './NavBarComponent';
import TableRow from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import formatDate from '../_utils/dateFormatter';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';
import '../_css/AllocationsComponent.css';
import ItemsNotFoundComponent from './common/ItemsNotFoundComponent';

export class AllocationsComponent extends Component {
  state = {
    activePage: 1,
    limit: 10
  }

  componentDidMount() {
    this.props.loadAllocationsAction(this.state.activePage, this.state.limit);
  }

  getTotalPages = () => Math.ceil(this.props.allocationsCount / this.state.limit);

  handlePaginationChange = (event, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAllocationsAction(activePage, this.state.limit);
  };

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAllocationsAction(this.state.activePage, data.value);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.allAllocations)) {
      return (
        <NavbarComponent>
          <ItemsNotFoundComponent
            header="No Allocation found!"
            message="Please try again later, to see if we'll have allocations to show you."
          />
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="allocations-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="All Allocations" />
            <Divider id="assets-divider" />
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Asset</Table.HeaderCell>
                <Table.HeaderCell>Current Owner</Table.HeaderCell>
                <Table.HeaderCell>Previous Owner</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.allAllocations.map((allocation) => {
                  allocation.formatted_date = formatDate(allocation.created_at);
                  return (
                    <TableRow
                      key={allocation.created_at}
                      data={allocation}
                      headings={['asset', 'current_owner', 'previous_owner', 'formatted_date']}
                    />
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.allAllocations) && (
                <Table.HeaderCell colSpan="5" id="pagination-header">
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
                        onChange={this.handleRowChange}
                        value={this.state.limit}
                        upward
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

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations, allocationsCount, isLoading } = allocationsList;

  return {
    allAllocations,
    allocationsCount,
    isLoading
  };
};

AllocationsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  allAllocations: PropTypes.array.isRequired,
  allocationsCount: PropTypes.number,
  loadAllocationsAction: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction
})(AllocationsComponent));
