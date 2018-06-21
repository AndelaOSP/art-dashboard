import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Container } from 'semantic-ui-react';

import { loadAllocationsAction } from '../_actions/allocations.actions';
import SideMenuComponent from '../_components/SideMenuComponent';
import TableRowComponent from './TableRowComponent';

export class AllocationsComponent extends Component {
  componentDidMount() {
    this.props.loadAllocationsAction();
  }

  emptyAllocationsCheck = () => {
    return this.props.allAllocations.length === 0;
  }

  loadAllocations = () => {
    if (this.emptyAllocationsCheck()) {
      return <Table.Row><Table.Cell colSpan="3">No Data found</Table.Cell></Table.Row>
    }
    return this.props.allAllocations.map((allocation, index) => {
      return <TableRowComponent
        key={index}
        data={allocation}
        headings={['asset', 'current_owner', 'previous_owner', 'created_at']} />
    });
  }

  render() {
    return (
      <SideMenuComponent>
        <Container>
          <Header content='All Allocations' />
          <Table celled>
            <Table.Header>
              {/* @TODO make the header cells more flexible depending on response from API */}
              <Table.Row>
                <Table.HeaderCell>Asset</Table.HeaderCell>
                <Table.HeaderCell>Current Owner</Table.HeaderCell>
                <Table.HeaderCell>Previous Owner</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.loadAllocations()
              }
            </Table.Body>
          </Table>
        </Container>
      </SideMenuComponent>
    )
  }
}

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations } = allocationsList;

  return {
    allAllocations,
  }
}

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction,
})(AllocationsComponent));
