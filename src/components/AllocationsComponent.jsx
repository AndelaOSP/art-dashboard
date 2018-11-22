import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { loadAllocationsAction, setActivePage, loading, resetAllocations } from '../_actions/allocations.actions';
import NavBarComponent from '../_components/NavBarContainer';
import TableRow from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import formatDate from '../_utils/dateFormatter';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';
import '../_css/AllocationsComponent.css';
import ItemsNotFoundComponent from './common/ItemsNotFoundComponent';
import { isCountCutoffExceeded, fetchData } from '../_utils/helpers';

const CUTOFF_LIMIT = 10;
const checkIfCutoffExceeded = isCountCutoffExceeded(CUTOFF_LIMIT);
export class AllocationsComponent extends Component {
  state = {
    limit: 10,
    allocations: [],
    allDataFetched: false
  }

  componentDidMount() {
    const allocationsEmpty = _.isEmpty(this.props.allAllocations);
    if (allocationsEmpty) {
      this.props.loadAllocationsAction(this.props.activePage, this.state.limit);
    }
  }

  getTotalPages = () => Math.ceil(this.props.allocationsCount / this.state.limit);

  handlePaginationChange = (event, { activePage }) => {
    this.props.setActivePage(activePage);
    const currentPageList = this.props.allAllocations[`page_${activePage}`];

    if (_.isEmpty(currentPageList)) {
      this.retrieveAllocations(activePage, this.state.limit);
    }
  };

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.setState({ allocations: [] });
    this.props.resetAllocations();
    this.retrieveAllocations(this.props.activePage, data.value);
  }

  retrieveAllocations = (activePage, limit) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      const url = `allocations?page=${activePage}&page_size=${limit}`;
      this.props.loading(true);
      return fetchData(url).then((response) => {
        this.props.loading(false);
        this.setState({ allocations: response.data.results });
      }).catch(() => {
        this.props.loading(false);
        this.setState({ allDataFetched: true });
      });
    }
    return this.props.loadAllocationsAction(activePage, limit);
  }

  render() {
    const { allocations } = this.state;
    const currentAllocations = `page_${this.props.activePage}`;
    const renderedAllocations = this.props.allAllocations[currentAllocations] || allocations;
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(renderedAllocations)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            allDataFetched={this.state.allDataFetched}
            message="Please try again later, to see if we'll have allocations to show you."
          />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
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
                renderedAllocations.map((allocation) => {
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
                        activePage={this.props.activePage}
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
      </NavBarComponent>
    );
  }
}

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations, allocationsCount, isLoading, activePage } = allocationsList;
  return {
    allAllocations,
    allocationsCount,
    isLoading,
    activePage
  };
};

AllocationsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  allAllocations: PropTypes.object.isRequired,
  allocationsCount: PropTypes.number,
  loadAllocationsAction: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  activePage: PropTypes.number,
  resetAllocations: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction, loading, fetchData, setActivePage, resetAllocations
})(AllocationsComponent));
