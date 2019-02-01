import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import IsActiveContainer from '../_components/SecurityUser/IsActiveContainer';

export class TableRowComponent extends React.Component {
  handleView = () => {
    const { viewDetailsRoute, history, data } = this.props;
    if (!viewDetailsRoute) {
      return null;
    }
    return history.push(viewDetailsRoute, data);
  };

  handleClick = () => {
    this.props.onClick(this.props.data);
  }

  handleHeadings = (heading) => {
    if (heading === 'is_active') {
      if (this.props.data[heading] === true || this.props.data[heading] === false) {
        return (<IsActiveContainer securityUser={this.props.data} />);
      }
    }

    return this.props.data[heading];
  }

  render() {
    return (
      <Table.Row onClick={this.handleView}>
        {this.props.headings
          .map(heading => (
            <Table.Cell key={heading}>
              {this.handleHeadings(heading)}
            </Table.Cell>
          )
          )}
        {this.props.showAction &&
          <Table.Cell>
            <Icon
              data={this.props.data}
              name="edit"
              className="asset-detail__table__icon"
              onClick={this.handleClick}
            />
          </Table.Cell>}
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
  viewDetailsRoute: PropTypes.string,
  showAction: PropTypes.bool,
  onClick: PropTypes.func
};

export default withRouter(TableRowComponent);
