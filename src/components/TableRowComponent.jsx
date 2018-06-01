import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const TableRowComponent = props => (
  <Table.Row>
    {props.headings
      .map((heading, index) => {
        return
          <Table.Cell key={index}>
            {props.data[heading]}
          </Table.Cell>
      }
    )}
  </Table.Row>
);

TableRowComponent.propTypes = {
  headings: PropTypes.array,
  data: PropTypes.object
};

export default TableRowComponent;
