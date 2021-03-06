import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Table } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';
import FormatDate from '../_utils/dateFormatter';
import TableRow from './TableRowComponent';

import '../_css/AssetAllocationHistory.css';

const AssetAllocationHistory = ({ allocationHistory }) => {
  if (isEmpty(allocationHistory)) {
    return (
      <p className="history-unavailable">
        Allocation history is not available for this asset
      </p>
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
            allocationHistory.map((allocationRecord) => {
              if (allocationRecord.previous_owner === null) {
                allocationRecord.previous_owner = ' - ';
              }
              if (allocationRecord.current_owner === null) {
                allocationRecord.current_owner = ' - ';
              }
              allocationRecord.created_at = FormatDate(allocationRecord.created_at);
              return (
                <TableRow
                  key={uuidv4()}
                  data={allocationRecord}
                  headings={['created_at', 'current_owner', 'previous_owner']}
                />
              );
            })
          }
        </Table.Body>
      </Table>
    </Container>
  );
};

AssetAllocationHistory.propTypes = {
  allocationHistory: PropTypes.array
};

export default AssetAllocationHistory;
