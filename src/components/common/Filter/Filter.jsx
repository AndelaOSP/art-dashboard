import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import FilterComponent from '../../../_components/common/FilterContainer';
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
    {
      props.filterData.map((data, index) => (
        <FilterComponent
          key={uuidv4()}
          index={index}
          option={data}
          selected={props.selected}
          filterSelection={props.filterSelection}
        />
      ))
    }
  </FilterButton>
);

Filter.propTypes = {
  filterAction: PropTypes.func,
  selected: PropTypes.object.isRequired,
  filterSelection: PropTypes.func,
  filterData: PropTypes.arrayOf(PropTypes.object),
  activePage: PropTypes.number,
  limit: PropTypes.number,
  isLoading: PropTypes.bool
};

export default Filter;
