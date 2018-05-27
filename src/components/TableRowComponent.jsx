import React, { Fragment } from 'react';
import { Table } from 'semantic-ui-react';

const TableRowComponent = props => (
  <Table.Row>
    <Table.Cell>{props.data.category}</Table.Cell>
    <Table.Cell>{props.data.sub_category}</Table.Cell>
    <Table.Cell>{props.data.asset_type}</Table.Cell>
    {
      props.aasets && (
        <Fragment>
          <Table.Cell>{props.data.make}</Table.Cell>
          <Table.Cell>{props.data.model_number}</Table.Cell>
          <Table.Cell>{props.data.asset_code}</Table.Cell>
        </Fragment>
      )
    }
  </Table.Row>
);

export default TableRowComponent;
