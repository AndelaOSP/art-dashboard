import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  buttonName, color, handleClick, buttonState, customCss, disabledState
}) => {
  if (color === 'primary') {
    return (
      <Button
        primary
        onClick={handleClick}
        disabled={disabledState}
        loading={buttonState}
        className={customCss}
      >
        {buttonName}
      </Button>
    );
  }
  return (
    <Button
      secondary
      type="reset"
      onClick={handleClick}
      disabled={disabledState}
      className={customCss}
    >
      {buttonName}
    </Button>
  );
};

ButtonComponent.propTypes = {
  buttonName: PropTypes.string.isRequired,
  color: PropTypes.string,
  handleClick: PropTypes.func,
  buttonState: PropTypes.bool,
  customCss: PropTypes.string,
  disabledState: PropTypes.bool
};

ButtonComponent.defaultProps = {
  color: '',
  handleClick: () => {},
  buttonState: false,
  customCss: '',
  disabledState: false
};

export default ButtonComponent;
