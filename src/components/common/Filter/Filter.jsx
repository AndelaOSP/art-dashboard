import React from 'react';
import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';
import FilterButton from './FilterButton';

const Filter = props => (
  <FilterButton
    activePage={props.activePage}
    limit={props.limit}
    selected={props.selected}
    filterAction={props.filterAction}
    disabled={props.isLoading}
    option={props.filterData[1]}
  >
    <React.Fragment>
      {
        props.filterData.map((data, index) => (
          <FilterComponent
            index={index}
            option={data}
            selected={props.selected}
            filterSelection={props.filterSelection}
          />
        ))
      }
    </React.Fragment>
  </FilterButton>
);

Filter.propTypes = {
  filterAction: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func,
  filterData: PropTypes.arrayOf(PropTypes.object),
  activePage: PropTypes.number,
  limit: PropTypes.number,
  isLoading: PropTypes.bool
};

export default Filter;
