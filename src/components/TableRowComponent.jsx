import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const TableRowComponent = props => (
  <Table.Row>
    {props.headings
      .map(heading => (
        <Table.Cell key={heading}>
          {props.data[heading]}
        </Table.Cell>
      )
      )}
    {props.children}
  </Table.Row>
);

TableRowComponent.propTypes = {
  headings: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default TableRowComponent;
