import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { loadAllocationsAction } from '../_actions/allocations.actions';
import NavbarComponent from './NavBarComponent';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import AllocationActionComponent from './AllocationActionComponent';
import formatDate from '../_utils/dateFormatter';
import '../_css/AllocationsComponent.css';

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

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.allAllocations)) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              No Assets Currently Assigned
            </h1>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <Container>
          <Header content="All Allocations" className="allocations-heading" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Asset</Table.HeaderCell>
                <Table.HeaderCell>Current Owner</Table.HeaderCell>
                <Table.HeaderCell>Previous Owner</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.allAllocations.map((allocation) => {
                  allocation.formatted_date = formatDate(allocation.created_at);
                  return (
                    <TableRowComponent
                      key={allocation.created_at}
                      data={allocation}
                      headings={['asset', 'current_owner', 'previous_owner', 'formatted_date']}
                    >
                      <Table.Cell>
                        <AllocationActionComponent />
                      </Table.Cell>
                    </TableRowComponent>
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5">
                  {!_.isEmpty(this.props.allAllocations) &&
                    <Pagination
                      totalPages={this.getTotalPages()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                  }
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
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
