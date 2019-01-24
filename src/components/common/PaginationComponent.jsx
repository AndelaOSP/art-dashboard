import React from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
  Segment
} from 'semantic-ui-react';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from './DropdownComponent';
import '../../_css/PaginationComponent.css';

const PaginationComponent = (props) => {
  const hidePaginator = props.totalPages <= 1;
  if (hidePaginator) {
    return null;
  }

  return (
    <Segment.Group
      horizontal
      compact
      id="art-pagination-section"
    >
      <Segment compact>
        <Pagination
          id="art-pagination-component"
          totalPages={props.totalPages}
          onPageChange={props.handlePaginationChange}
          activePage={props.activePage}
          disabled
        />
      </Segment>
      <Segment compact>
        <DropdownComponent
          customClass="page-limit"
          placeHolder="Show Rows"
          options={rowOptions}
          upward
          value={props.limit}
          onChange={props.handleRowChange}
        />
      </Segment>
    </Segment.Group>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number,
  handleRowChange: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  limit: PropTypes.number,
  totalPages: PropTypes.number
};

PaginationComponent.defaultProps = {
  totalPages: 0
};

export default PaginationComponent;
