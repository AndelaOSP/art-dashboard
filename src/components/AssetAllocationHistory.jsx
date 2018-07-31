import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Table, Pagination } from 'semantic-ui-react';
import FormatDate from '../_utils/dateFormatter';
import TableRowComponent from './TableRowComponent';
import '../_css/AssetAllocationHistory.css';

export class AssetAllocationHistory extends Component {
  state = {
    activePage: 1,
    pageLimit: 4,
    renderedData: []
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ renderedData: this.props.allocationHistory.slice(0, this.state.pageLimit) });
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    const limit = this.state.pageLimit;
    const renderedData = this.props.allocationHistory
      .slice((activePage - 1) * limit, ((activePage - 1) * limit) + limit);

    this.setState({ activePage, renderedData });
  }

  render() {
    const { activePage, pageLimit } = this.state;

    if (isEmpty(this.props.allocationHistory)) {
      return (
        <p className="history-unavailable" > Allocation history is not available for this asset</p>
      );
    }

    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Current Owner</Table.HeaderCell>
              <Table.HeaderCell>Previous Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.state.renderedData.map((allocationRecord) => {
                if (allocationRecord.previous_owner === null) {
                  allocationRecord.previous_owner = ' - ';
                }
                if (allocationRecord.current_owner === null) {
                  allocationRecord.current_owner = ' - ';
                }
                allocationRecord.created_at = FormatDate(allocationRecord.created_at);
                return (
                  <TableRowComponent
                    key={allocationRecord.id}
                    data={allocationRecord}
                    headings={['created_at', 'current_owner', 'previous_owner']}
                  />);
              })
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                {
                  !isEmpty(this.props.allocationHistory) &&
                  <Pagination
                    totalPages={this.props.allocationHistory.length / pageLimit}
                    onPageChange={this.handlePaginationChange}
                    activePage={activePage}
                  />
                }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

AssetAllocationHistory.propTypes = {
  allocationHistory: PropTypes.array
};

export default AssetAllocationHistory;
