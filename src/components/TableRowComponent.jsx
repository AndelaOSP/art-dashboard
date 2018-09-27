import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export class TableRowComponent extends React.Component {
  handleView = () => {
    const { viewDetailsRoute, history, data } = this.props;
    if (!viewDetailsRoute) {
      return null;
    }
    return history.push(viewDetailsRoute, data);
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

export default withRouter(TableRowComponent);
