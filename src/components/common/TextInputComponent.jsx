import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TextInputComponent = (props) => (
  <Input
    fluid
    size="large"
    style={{width: "65%"}}
    icon="pencil"
    placeholder={props.placeholder}
  />
);

TextInputComponent.propTypes = {
  placeholder: PropTypes.string,
};

TextInputComponent.defaultProps = {
  placeholder: '',
};

export default TextInputComponent;
