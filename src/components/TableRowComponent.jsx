import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class TableRowComponent extends React.Component {
  handleView = () => {
    if (_.isEmpty(this.props.viewDetailsRoute)) {
      return null;
    }
    return this.props.history.push(this.props.viewDetailsRoute);
  };

  render() {
    return (
      <Table.Row onClick={this.handleView}>
        {this.props.headings
          .map(heading => (
            <Table.Cell key={heading}>
              {this.props.data[heading]}
            </Table.Cell>
          )
          )}
        {this.props.children}
      </Table.Row>
    );
  }
}

TableRowComponent.propTypes = {
  headings: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
  history: PropTypes.object,
  viewDetailsRoute: PropTypes.string
};

export default TableRowComponent;
