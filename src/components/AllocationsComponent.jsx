import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
      this.setTableContent();
    }
  }

  getTotalPages = () => {
    return Math.ceil(this.props.allAllocations.length / this.state.limit);
  }

  setTableContent = () => {
    let currentAllocations = this.props.allAllocations.slice(this.state.offset, (this.state.activePage * this.state.limit));
    // format date
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    currentAllocations.map(el => {
      return el.created_at = new Date(el.created_at).toLocaleDateString('en-US', dateOptions);
    });
    this.setState({
      currentAllocations: currentAllocations,
    });
  }

  handlePaginationChange = (event, { activePage }) => {
    this.setState({
      activePage,
      offset: (activePage - 1) * this.state.limit,
    }, () => this.setTableContent());
  }

  isEmptyAllocations = () => this.props.allAllocations.length === 0;

  showAllocations = () => {
    return this.state.currentAllocations.map((allocation, index) => (
      <TableRowComponent
        key={index}
        data={allocation}
        headings={['asset', 'current_owner', 'previous_owner', 'created_at']} />
    ));
  }

  display = () => {
    if (this.props.isLoading) {
      return <LoaderComponent size="large" dimmerStyle={{ height: "100vh" }} />;
    } else if (!this.props.isLoading && this.isEmptyAllocations()) {
      return (
        <Container>
          <p>
            Unable to load allocations
          </p>
        </Container>
      );
    }
    return (
      <Container>
        <Header content="All Allocations" />
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
              this.showAllocations()
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
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
          this.display()
        }
      </SideMenuComponent>
    );
  }
}

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations, isLoading } = allocationsList;

  return {
    allAllocations,
    isLoading,
  };
};

AllocationsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction,
})(AllocationsComponent));
