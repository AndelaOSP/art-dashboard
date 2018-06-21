import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadAllocationsAction } from '../_actions/allocations.actions';
import { withRouter } from 'react-router-dom';

export class AllocationsComponent extends Component {
  componentDidMount() {
    this.props.loadAllocationsAction();
  }
  render() {
    return (
      <div>Hello world</div>
    )
  }
}

const mapStateToProps = ({ allocationsList }) => {
  const { allAllocations } = allocationsList;

  return {
    allAllocations,
  }
}

export default withRouter(connect(mapStateToProps, {
  loadAllocationsAction,
})(AllocationsComponent));
