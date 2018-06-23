import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const action = () => (
  <span>
    <Link to="/asset_types" data-tooltip="View"><Icon name="eye" /></Link>
    <Link to="/asset_types" data-tooltip="Edit"><Icon name="edit" /></Link>
  </span>
);


const TableRowComponent = props => (
  <Table.Row>
    {props.headings
      .map(heading => (
        <Table.Cell key={heading.id}>
          {props.data[heading]}
        </Table.Cell>
        )
      )}
    {
        props.action ?
          <Table.Cell>
            {action()}
          </Table.Cell> : null

      }

  </Table.Row>
);

TableRowComponent.propTypes = {
  headings: PropTypes.array,
  data: PropTypes.object,
  action: PropTypes.bool
};
TableRowComponent.defaultProps = {
  headings: [],
  data: null,
  action: false
};


export default TableRowComponent;
