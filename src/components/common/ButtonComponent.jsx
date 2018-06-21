import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  buttonName, color, handleClick, buttonState
}) => {
  if (color === 'primary') {
    return (
      <Button primary onClick={handleClick} loading={buttonState}>
        {buttonName}
      </Button>
    );
  }
  return (
    <Button secondary type="reset" onClick={handleClick}>
      {buttonName}
    </Button>
  );
};

ButtonComponent.propTypes = {
  buttonName: PropTypes.string.isRequired,
  color: PropTypes.string,
  handleClick: PropTypes.func,
  buttonState: PropTypes.bool
};

ButtonComponent.defaultProps = {
  color: '',
  handleClick: () => {},
  buttonState: false
};

export default ButtonComponent;
