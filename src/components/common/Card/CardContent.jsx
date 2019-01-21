import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

const CardContent = props => (
  <Fragment>
    {
        props.headings.map(heading => (
          <span key={uuidv4()}>
            {props.data[heading]}
            <br />
          </span>
        ))
      }
  </Fragment>
);

CardContent.propTypes = {
  headings: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
};

export default CardContent;
