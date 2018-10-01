import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PRIMARY_COLOR = 'primary';

const ButtonComponent = ({
  buttonName,
  color,
  handleClick,
  buttonState,
  customCss,
  disabledState,
  fluidState
}) => {
  let additionalProps = {
    secondary: true,
    type: 'reset'
  };
  if (color === PRIMARY_COLOR) {
    additionalProps = {
      primary: true,
      loading: buttonState
    };
  }

  return (
    <Button
      {...additionalProps}
      onClick={handleClick}
      disabled={disabledState}
      className={customCss}
      fluid={fluidState}
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
  disabledState: PropTypes.bool,
  fluidState: PropTypes.bool
};

ButtonComponent.defaultProps = {
  color: '',
  handleClick: () => {},
  buttonState: false,
  customCss: '',
  disabledState: false,
  fluidState: false
};

export default ButtonComponent;
