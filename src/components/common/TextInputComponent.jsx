import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TextInputComponent = (props) => (
  <Input
    size='large'
    style={{width: '65%'}}
    fluid icon='pencil'
    placeholder={props.placeholder}
  />
);

TextInputComponent.propTypes = {
  placeholder: PropTypes.string,
};

export default TextInputComponent;