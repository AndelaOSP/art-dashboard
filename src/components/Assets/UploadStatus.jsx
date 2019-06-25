import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export const StatusMessage = props => (
  <div className={`${props.className} `}>
    {props.message}
  </div>
);

export const uploadStatus = (success, error, rejected) => {
  const errorMessage = !isEmpty(rejected) ? 'Only csv files can be imported' : success.fail;

  if (success.fail || error || !isEmpty(rejected)) {
    return (
      <div>
        <Icon name="x icon" size="big" />
        {errorMessage || error}
      </div>
    );
  }

  return (
    <div>
      <Icon name="check" size="big" />
      {success.success}
    </div>
  );
};

StatusMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};
