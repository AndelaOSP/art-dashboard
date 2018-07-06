import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const TableHeaderComponent = props => (
  <Table.Header>
    <Table.Row>
      {
        props.children
        ? props.titles.map(cellTitle => (
          <Table.HeaderCell key={cellTitle}>
            {props.children}
          </Table.HeaderCell>
        ))
        : props.titles.map(cellTitle =>
          <Table.HeaderCell key={cellTitle}>{cellTitle}</Table.HeaderCell>
        )
      }
    </Table.Row>
  </Table.Header>
);

TableHeaderComponent.propTypes = ({
  titles: PropTypes.array,
  children: PropTypes.node
});

export default TableHeaderComponent;
