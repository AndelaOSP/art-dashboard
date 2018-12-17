import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../common/FilterMain';

const UserFilterButton = props => (
  <Filter
    activePage={props.activePage}
    limit={props.limit}
    filterData={props.filterData}
    selected={props.selected}
    filterSelection={props.filterSelection}
    filterAction={props.loadUsers}
    disabled={props.isLoading}
  />
);

UserFilterButton.propTypes = {
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func,
  filterData: PropTypes.arrayOf(PropTypes.object),
  activePage: PropTypes.number,
  limit: PropTypes.number,
  loadUsers: PropTypes.func,
  isLoading: PropTypes.bool
};

export default UserFilterButton;
