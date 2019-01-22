import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export const StatusMessage = props => (
  <div className={`${props.className} `}>
    {props.message}
  </div>
);

export const uploadStatus = (success, error) => {
  if (success.fail || error) {
    return (
      <div>
        <Icon name="x icon" size="big" />
        {success.fail || error}
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
