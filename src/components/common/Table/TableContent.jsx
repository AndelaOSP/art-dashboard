import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TableRow from '../../TableRowComponent';

export const formatDataKeys = (data, entity) => {
  if (entity !== 'users') {
    return data;
  }

  return {
    ...data,
    assets_assigned: data.allocated_asset_count
  };
};

const TableContent = ({ data, headings, urlEntity = '' }) => (
  <Table.Body>
    {data.map((info) => {
      const viewUrl = urlEntity ? `${urlEntity}/${info.id}/view` : '';

      return (
        <TableRow
          key={info.id}
          viewDetailsRoute={viewUrl}
          headings={headings}
          data={formatDataKeys(info, urlEntity)}
          data-test="table-row"
        />
      );
    })}
  </Table.Body>
);

TableContent.propTypes = {
  data: PropTypes.array,
  headings: PropTypes.arrayOf(PropTypes.string),
  urlEntity: PropTypes.string
};

export default TableContent;
