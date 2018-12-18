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
      id="art-pagination-section"
      className={props.isLoading ? 'entity-loading-pagination' : 'entity-loaded-pagination'}
    >
      <Segment>
        <Pagination
          id="art-pagination-component"
          totalPages={props.totalPages}
          onPageChange={props.handlePaginationChange}
          activePage={props.activePage}
          disabled
        />
      </Segment>
      <Segment>
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
  totalPages: PropTypes.number,
  isLoading: PropTypes.bool
};

PaginationComponent.defaultProps = {
  totalPages: 0
};

export default PaginationComponent;
