import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const iconStyle = {
  margin: 10
};

const action = (
  <span>
    <Link to="/asset_types" data-tooltip="View"><Icon style={iconStyle} name="eye" /></Link>
    <Link to="/asset_types" data-tooltip="Edit"><Icon style={iconStyle} name="edit" /></Link>
  </span>
);

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

TableRowComponent.defaultProps = {
  children: <span />
};
export default TableRowComponent;
