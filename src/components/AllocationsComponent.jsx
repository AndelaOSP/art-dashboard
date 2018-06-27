import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import loadAllocationsAction from '../_actions/allocations.actions';
import SideMenuComponent from '../_components/SideMenuComponent';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import AllocationActionComponent from './AllocationActionComponent';
import '../_css/AllocationsComponent.css';

export class AllocationsComponent extends Component {
  state = {
    currentAllocations: [],
    offset: 0,
    activePage: 1,
    limit: 10
  }

  componentDidMount() {
    this.props.loadAllocationsAction();
  }

  componentDidUpdate(prevProps) {
    if (this.props.allAllocations.length !== prevProps.allAllocations.length) {
      this.setTableContent();
    }
  }

  getTotalPages = () => Math.ceil(this.props.allAllocations.length / this.state.limit);

  setTableContent = () => {
    const currentAllocations = this.props.allAllocations.slice(this.state.offset,
      (this.state.activePage * this.state.limit));
    // format date
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    currentAllocations.map(el => el.formatted_date = new Date(el.created_at).toLocaleDateString('en-US', dateOptions));
    this.setState({
      currentAllocations
    });
  }

  calculateOffset = (activePage, limit) => (activePage - 1) * limit;

  handlePaginationChange = (event, { activePage }) => {
    this.setState({
      activePage,
      offset: this.calculateOffset(activePage, this.state.limit)
    }, () => this.setTableContent());
  }

  render() {
    if (this.props.isLoading) {
      return (
        <SideMenuComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />
        </SideMenuComponent>
      );
    } else if (!this.props.isLoading && _.isEmpty(this.props.allAllocations)) {
      return (
        <SideMenuComponent>
          <Container>
            <h1>
              Unable to load allocations
            </h1>
          </Container>
        </SideMenuComponent>
      );
    }
    return (
      <SideMenuComponent>
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
                this.state.currentAllocations.map(allocation => (
                  <TableRowComponent
                    key={allocation.created_at}
                    data={allocation}
                    headings={['asset', 'current_owner', 'previous_owner', 'formatted_date']}
                  >
                    <Table.Cell>
                      <AllocationActionComponent />
                    </Table.Cell>
                  </TableRowComponent>
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
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
      </SideMenuComponent>
    );
  }
}

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations, isLoading } = allocationsList;

  return {
    allAllocations,
    isLoading
  };
};

AllocationsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  allAllocations: PropTypes.array.isRequired,
  loadAllocationsAction: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction
})(AllocationsComponent));
