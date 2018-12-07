import React from 'react';
import PropTypes from 'prop-types';
import FilterComponent from '../common/FilterComponent';
import FilterButton from '../common/FilterButton';

const UserFilterButton = props => (
  <FilterButton
    activePage={props.activePage}
    limit={props.limit}
    selected={props.selected}
    filterAction={props.loadUsers}
    disabled={props.isLoading}
    option={props.filterData[1]}
  >
    <React.Fragment>
      <FilterComponent
        index={0}
        option={props.filterData[0]}
        selected={props.selected}
        filterSelection={props.filterSelection}
      />

      <FilterComponent
        index={1}
        option={props.filterData[1]}
        selected={props.selected}
        filterSelection={props.filterSelection}
      />
    </React.Fragment>
  </FilterButton>
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
