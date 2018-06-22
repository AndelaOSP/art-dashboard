import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const action = () => (<span>
  <Link to="#"><Icon name="edit" /></Link>
  <Link to="#"><Icon name="eye" /></Link>
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
  action: false
};


export default TableRowComponent;
