import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Container } from 'semantic-ui-react';

import { loadAllocationsAction } from '../_actions/allocations.actions';
import SideMenuComponent from '../_components/SideMenuComponent';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';

export class AllocationsComponent extends Component {
  state = {
    currentAllocations: [],
    offset: 0,
    activePage: 1,
    limit: 10,
  }

  componentDidMount() {
    this.props.loadAllocationsAction();
  }

  componentDidUpdate(prevProps) {
    if (this.props.allAllocations.length !== prevProps.allAllocations.length) {
      this.setTableComponent();
    }
  }

  getTotalPages = () => {
    return Math.ceil(this.props.allAllocations.length / this.state.limit);
  }

  setTableComponent = () => {
    this.setState({
      currentAllocations: this.props.allAllocations.slice(this.state.offset, (this.state.activePage * this.state.limit))
    })
  }

  handlePaginationChange = (event, { activePage }) => {
    this.setState({
      activePage,
      offset: (activePage - 1) * this.state.limit,
    }, () => this.setTableComponent())
  }

  isEmptyAllocations = () => {
    return this.props.allAllocations.length === 0;
  }

  loadAllocations = () => {
    if (this.isEmptyAllocations()) {
      return <Table.Row><Table.Cell colSpan="3">No Data found</Table.Cell></Table.Row>
    }
    return this.state.currentAllocations.map((allocation, index) => {
      return <TableRowComponent
        key={index}
        data={allocation}
        headings={['asset', 'current_owner', 'previous_owner', 'created_at']} />
    });
  }

  showTable = () => {
    if (this.props.isLoading) {
      return <LoaderComponent size='large' dimmerStyle={{ height: '100vh' }} />
    }
    return (
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

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                {
                  (this.isEmptyAllocations()) ? '' :
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
    );
  }

  render() {
    return (
      <SideMenuComponent>
        {
          this.showTable()
        }
      </SideMenuComponent>
    )
  }
}

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations, isLoading } = allocationsList;

  return {
    allAllocations,
    isLoading,
  }
}

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction,
})(AllocationsComponent));
