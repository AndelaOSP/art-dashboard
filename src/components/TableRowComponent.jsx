import React from 'react';
import { Table } from 'semantic-ui-react';

const TableRowComponent = props => (
  <Table.Row>
    <Table.Cell>{props.data.category}</Table.Cell>
    <Table.Cell>{props.data['sub-category']}</Table.Cell>
    <Table.Cell>{props.data.type}</Table.Cell>
  </Table.Row>
);

export default TableRowComponent;
